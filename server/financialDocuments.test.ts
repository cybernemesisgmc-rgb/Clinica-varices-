import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb, getFinancialDocuments, getFinancialDocumentsByType, createFinancialDocument, deleteFinancialDocument } from './db';
import { InsertFinancialDocument } from '../drizzle/schema';

describe('Financial Documents', () => {
  let testDocId: number | null = null;

  beforeAll(async () => {
    // Ensure database is initialized
    const db = await getDb();
    expect(db).toBeDefined();
  });

  it('should get all financial documents', async () => {
    const docs = await getFinancialDocuments();
    expect(Array.isArray(docs)).toBe(true);
  });

  it('should get financial documents by year', async () => {
    const currentYear = new Date().getFullYear();
    const docs = await getFinancialDocuments(currentYear);
    expect(Array.isArray(docs)).toBe(true);
  });

  it('should get financial document by type', async () => {
    const currentYear = new Date().getFullYear();
    const doc = await getFinancialDocumentsByType(currentYear, 'balance');
    // Document might not exist, but function should work
    expect(doc === undefined || doc.documentType === 'balance').toBe(true);
  });

  it('should create a financial document', async () => {
    const currentYear = new Date().getFullYear();
    const testDoc: InsertFinancialDocument = {
      year: currentYear,
      documentType: 'balance',
      fileName: 'test-balance.pdf',
      fileUrl: 'https://example.com/test-balance.pdf',
      fileKey: 'test-balance-key',
      uploadedBy: 1
    };

    const created = await createFinancialDocument(testDoc);
    expect(created).toBeDefined();
    expect(created?.fileName).toBe('test-balance.pdf');
    expect(created?.year).toBe(currentYear);
    expect(created?.documentType).toBe('balance');

    if (created) {
      testDocId = created.id;
    }
  });

  it('should retrieve created document', async () => {
    if (!testDocId) {
      console.log('Skipping retrieval test - no document created');
      return;
    }

    const currentYear = new Date().getFullYear();
    const doc = await getFinancialDocumentsByType(currentYear, 'balance');
    expect(doc).toBeDefined();
    expect(doc?.fileName).toBe('test-balance.pdf');
  });

  it('should delete a financial document', async () => {
    if (!testDocId) {
      console.log('Skipping deletion test - no document created');
      return;
    }

    const success = await deleteFinancialDocument(testDocId);
    expect(success).toBe(true);

    // Verify deletion
    const doc = await getFinancialDocumentsByType(new Date().getFullYear(), 'balance');
    expect(doc?.id !== testDocId).toBe(true);
  });

  afterAll(async () => {
    // Cleanup if needed
    if (testDocId) {
      await deleteFinancialDocument(testDocId);
    }
  });
});
