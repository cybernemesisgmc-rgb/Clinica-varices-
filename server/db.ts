import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, financialDocuments, InsertFinancialDocument, FinancialDocument } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Financial Documents functions
export async function getFinancialDocuments(year?: number): Promise<FinancialDocument[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get documents: database not available");
    return [];
  }

  try {
    if (year) {
      return await db.select().from(financialDocuments).where(eq(financialDocuments.year, year));
    }
    return await db.select().from(financialDocuments);
  } catch (error) {
    console.error("[Database] Failed to get financial documents:", error);
    return [];
  }
}

export async function getFinancialDocumentsByType(year: number, documentType: string): Promise<FinancialDocument | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get document: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(financialDocuments).where(
      and(
        eq(financialDocuments.year, year),
        eq(financialDocuments.documentType, documentType as any)
      )
    ).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get financial document:", error);
    return undefined;
  }
}

export async function createFinancialDocument(doc: InsertFinancialDocument): Promise<FinancialDocument | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create document: database not available");
    return null;
  }

  try {
    const result = await db.insert(financialDocuments).values(doc);
    const id = result[0].insertId;
    const created = await db.select().from(financialDocuments).where(eq(financialDocuments.id, Number(id))).limit(1);
    return created.length > 0 ? created[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create financial document:", error);
    return null;
  }
}

export async function deleteFinancialDocument(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete document: database not available");
    return false;
  }

  try {
    await db.delete(financialDocuments).where(eq(financialDocuments.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete financial document:", error);
    return false;
  }
}
