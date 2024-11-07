--FUNCTIONS
--SELECT count(*) FROM Album --count(*) tavsiye edilmez
-- kac adet fatura kesilmis 
--SELECT count(total) From Invoice
--SELECT count(BillingState) From Invoice -- null lari saymaz

--MIN MAX AVG
--SELECT min(total) From Invoice
--SELECT max(total) From Invoice
--SELECT avg(total) From Invoice
--SELECT min(total) as enDusuk, max(total) as EnYuksek, avg(total) OrtalamaFatura From Invoice

--ROUND
--SELECT round(avg(total)) From Invoice
--SELECT round(avg(total),2) From Invoice

--LENGTH
--SELECT length(BillingAddress), BillingAddress FROM Invoice

-- GROUP BY
--SELECT * FROM Invoice WHERE BillingCountry="Germany";
--SELECT count(*) FROM Invoice GROUP by BillingCountry;
--her bir ülke icin kesilen fatura adedi
--SELECT BillingCountry, count(*) as kesilenFatura FROM Invoice GROUP by BillingCountry;

--En fazla fatura kesilen ülke 
--SELECT BillingCountry, max(total) FROM Invoice GROUP by BillingCountry
--SELECT BillingCountry, max(total), min(total) FROM Invoice GROUP by BillingCountry

--CRUD Create READ update DELETE
--CRUD Create READ update DELETE veri üzerinde degisiklik yapiyor 
--CREATE (ifadesi db yapisi üzerinde kullanilir)
--INSERT ifadesi veri üzerinde kullanilir
--INSERT INTO hangi alana hangi veriler 
--INSERT INTO tablenname(fields) VALUES(....,...)
--INSERT INTO Genre(GenreId,Name) VALUES(26, "Arabesk");
--INSERT INTO Genre VALUES(27, "Halk"); --db deki tablo field sirasi ne ise ona sira ekler 
--INSERT INTO Genre(Name,GenreId) VALUES("Sanat",28);

--Birden fazla kayit
/*INSERT INTO Genre 
VALUES
				(31, "türk pop"),
				(32, "türk Jazz"),
				(33, "Anadolu Rock");
*/