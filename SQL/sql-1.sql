-- bu bir yorum satiridir. singleLine
/*MultiLine commit
*/
--SELECT 1  AS One; --Satir sonu yorum
--SELECT 1  AS One/*araya yorum yazmak*/ 2 AS two
--SELECT 1  AS One; --bitimine noktali virgül
--Not Case sensetive(kucuk buyuk harf ayrimi yapmaz)
--SELECT 1 AS one;
--select 1 as one !standart olarak buyuk yazilir 

--*Piyasa standartlari:
--**SQL in Temel komutlari daima Büyük harfle yazilir. --SELECT * FROM albumName WHERE column=21 AND
--** string veriler tek tirnak veya cift tirnak kullanabiliriz standart olan tek tirnak 'string'
--** Her bir temel komut ayri satira yazilir.
/*
SELECT
FROM tableName
WHERE column=1
	AND (column2=1 OR column3=1)
*/


--- --- --- ---- SQL--- --- --- --- ---

--* SELECT --Sec getir
--* FROM --hangi tablo
--SELECT * FROM Album; tüm sütün
--SELECT Title, ArtistId FROM Album; --istedigimiz sütünlar gelmesi, tavsiye edilen sütünlari tek tek yazmak

--* AS --LAkap takma -- Tablo ve sütünlari gecici adlandirmak icin kullanilir
--SELECT 'data-123' AS baslik; --string
--SELECT 1+2 AS toplam; --matematiksel


--SELECT AlbumId AS no,Title AS baslik FROM Album; --sütün isimlendirme
--SELECT AlbumId+100 AS no,Title AS baslik FROM Album;