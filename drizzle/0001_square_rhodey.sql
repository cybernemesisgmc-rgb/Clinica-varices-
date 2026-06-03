CREATE TABLE `financial_documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`year` int NOT NULL,
	`documentType` enum('balance','ganancias','notas','patrimonio','flujo') NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileUrl` text NOT NULL,
	`fileKey` text NOT NULL,
	`uploadedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `financial_documents_id` PRIMARY KEY(`id`)
);
