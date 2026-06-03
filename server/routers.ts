import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getFinancialDocuments, getFinancialDocumentsByType, createFinancialDocument, deleteFinancialDocument } from "./db";
import { storagePut } from "./storage";
import { TRPCError } from "@trpc/server";

const COOKIE_NAME = "session";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  financialDocuments: router({
    list: publicProcedure
      .input(z.object({ year: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await getFinancialDocuments(input?.year);
      }),

    getByType: publicProcedure
      .input(z.object({
        year: z.number(),
        documentType: z.enum(["balance", "ganancias", "notas", "patrimonio", "flujo"])
      }))
      .query(async ({ input }) => {
        return await getFinancialDocumentsByType(input.year, input.documentType);
      }),

    upload: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        fileData: z.string() // base64 encoded file
      }))
      .mutation(async ({ input, ctx }) => {
        // Solo administradores pueden subir
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Solo los administradores pueden subir documentos"
          });
        }

        try {
          // Decode base64 file
          const buffer = Buffer.from(input.fileData, 'base64');
          
          // Upload to S3
          const fileKey = `financial-documents/${Date.now()}-${input.fileName}`;
          const { url } = await storagePut(fileKey, buffer, "application/pdf");

          // Save to database
          const doc = await createFinancialDocument({
            year: new Date().getFullYear(),
            documentType: "balance" as any,
            fileName: input.fileName,
            fileUrl: url,
            fileKey: fileKey,
            uploadedBy: ctx.user?.id || 0
          });

          if (!doc) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Error al guardar el documento"
            });
          }

          return doc;
        } catch (error) {
          console.error("Error uploading financial document:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error al subir el documento"
          });
        }
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        // Solo administradores pueden eliminar
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Solo los administradores pueden eliminar documentos"
          });
        }

        const success = await deleteFinancialDocument(input.id);
        if (!success) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error al eliminar el documento"
          });
        }

        return { success: true };
      })
  }),
});

export type AppRouter = typeof appRouter;
