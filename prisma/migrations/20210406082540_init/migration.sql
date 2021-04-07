-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "percentageOff" INTEGER NOT NULL DEFAULT 50,
    "totalLimit" INTEGER NOT NULL DEFAULT 100,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSale" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSale_AB_unique" ON "_ProductToSale"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSale_B_index" ON "_ProductToSale"("B");

-- AddForeignKey
ALTER TABLE "Customer" ADD FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSale" ADD FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSale" ADD FOREIGN KEY ("B") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
