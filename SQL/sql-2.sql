* DISTINCT - Tekrar edilen kayıtlarıın sadece bir defa gelmesini sağlar (benzer kaydı engeller).
-- SELECT DISTINCT City FROM Customer;
-- SELECT DISTINCT Country FROM Customer;
-- SELECT DISTINCT Country, City FROM Customer; --  Bütün sutunlardaki verilerin aynı olduğunu kontrol eder.


--* WHERE* Filtreleme
--SELECT * FROM Customer WHERE Country = USA --esit olanlari getir
--SELECT * FROM Customer WHERE Country != USA --esit olmayanlar (tercih edilen)
--SELECT * FROM Customer WHERE Country <> USA --esit olmayanlar
--SELECT * FROM Customer WHERE CustomerId > 20 --büyük olanlari getir
--SELECT * FROM Customer WHERE CustomerId >= 20  --büyük ve esit olanlari getir
--SELECT * FROM Customer WHERE CustomerId < 20  --kücük olanlari getir
--SELECT * FROM Customer WHERE CustomerId <= 20 --kücük ve esit olanlari
--SELECT * FROM Customer WHERE CustomerId BETWEEN10 AND 20 --10 ile 20arasindakini getir her ikiside dahil(genelde tarih)
--SELECT * FROM Customer WHERE CustomerId BETWEEN '2024-01-01' AND '2024-02-28' --genelde tarih böyle alinir

--WHERE * AND / OR / NOT
--SELECT * FROM Customer WHERE NOT Country = USA --NOT operatörü true/false verilerinde kullanilir (WHERE isActive = FALSE)=(WHERE NOT isActive)
--SELECT * FROM Customer WHERE Country = 'USA' AND NOT Company --alternativ NOT kullanimi
--SELECT * FROM Customer WHERE Country = 'USA' AND Company NOT NULL --Yukardaki ile ayni NOt kullanimi
--SELECT * FROM Customer WHERE Country = 'USA' OR Country = 'Brazil' OR Country= 'Denmark'
--SELECT * FROM Customer WHERE (Country = 'USA' OR Country = 'Brazil' OR Country= 'Denmark') AND CustomerId < 20 AND State= 'SP';

--WHERE* IN / NOT IN
--SELECT * FROM Customer WHERE Country IN ('USA','Brazil','Denmark') 
--SELECT * FROM Customer WHERE Country NOT IN ('USA','Brazil','Denmark')
--SELECT * FROM Customer WHERE CustomerId IN (1,2,4,8,16,32)

--*WHERE* LIKE (specialChars: '%'=JokerChars; '_' = SingleChar) --arama yapar
--SELECT * FROM Customer WHERE Country LIKE = 'USA' --USA olanlar
--SELECT * FROM Customer WHERE Address LIKE '696%'  --696 ile baslayanlar
--SELECT * FROM Customer WHERE Address LIKE '%langer' --'langer' ile bitenler
--SELECT * FROM Customer WHERE Address LIKE '%rue%'  --icinde rue gecenler
--SELECT * FROM Customer WHERE Phone LIKE '_55_%' --2.ve 3. karekteri 5 olanlari ve en az 4 karakter olanlari getir
--SELECT * FROM Customer WHERE Address LIKE '_a_%' --2. karekter 'a' ve en az 3 karekter olanlar 
-- SELECT * FROM Customer WHERE Phone LIKE '+__ 030%'; -- Ülke kodu bilinmeyen 030 ile başlaya telefonlar.
-- SELECT * FROM Customer WHERE Phone LIKE '+__ 030%' AND FirstName = 'Niklas'; -- Niklas isimli 030 ile başlayan numaralı kayıtlar.

--*ORDER BY* - Siralama (ASC= Adan Zye- DESC= Zden Aya)
--SELECT * FROM Customer ORDER BY CustomerId DESC
--SELECT * FROM Customer ORDER BY Country ASC --A-Z ye sirala
--SELECT * FROM Customer ORDER BY Country DESC --Z-A ya sirala
--SELECT * FROM Customer ORDER BY Country DESC, City ASC, LastName DESC; -- sirasiyla ülke sehir soyisim siralamasi yapar
--SELECT * FROM Customer ORDER BY Country, City, LastName DESC; --defualt siralama ASC yazilmasada olur
--SELECT * FROM Customer WHERE (Country = 'USA' OR Country = 'Brazil' OR Country= 'Denmark') AND CustomerId < 20 ORDER BY Country, City, LastName DESC ;
/* --piyasa standarti yazimi (yukardaki örnek)
SELECT CustomerId, FirstName, LastName, Company, City, Country
FROM Customer
WHERE (Country = 'USA' OR Country = 'Brazil' OR Country= 'Denmark')
	AND CustomerId < 20
ORDER BY Country, City, LastName DESC ;
*/

--*LIMIT* Limitler. Belli sayida kayit getirir
--SELECT * FROM Customer LIMIT 0, 10; --LIMIT (kac adet kayit atlayacak, kac adet kayit getirilecek 
--SELECT * FROM Customer LIMIT 5, 15;  --5 den basla 15 kayit getir
--SELECT * FROM Customer LIMIT 10; -- tek rakamda baslangici sifir kabul eder baslangic default 0 (tercih edilmez)
--SELECT * FROM Customer WHERE Country IN ('USA','Brazil','Denmark') LIMIT 5, 5; --filtrelemeden sonra ilk 5 atla 5 kayit getir
--SELECT * FROM Customer WHERE Country IN ('USA','Brazil','Denmark') ORDER BY FirstName ASC LIMIT 10, 15; 

--*SUBQUERIES* (SELECT in SELECT) (Nested QUERY)
--SELECT * FROM Album WHERE ArtistId = (SELECT ArtistId FROM Artist WHERE Name = 'Led Zeppeli')
--SELECT alb.AlbumId, alb.Title,(SELECT art.Name FROM Artist AS art WHERE art.ArtistId = alb.ArtistId) AS Artist FROM Album AS alb; --albümlerin sanatci verisini artist tablosundan cekti.

/*SELECT FirstName, LastName
FROM (
	SELECT * FROM Customer WHERE Country = 'USA' AND CustomerId > 20
	) WHERE FirstName LIKE '%a%'
	*/
	
--------JOINS ----------
--Birden fazla tablodan ayni anda veri cekmek icin kullanilir.

--* INNER JOIN --Yalnizca kesisen kayitlari getirir.
--* (Alternetiv yazim yöntemi olarak sadece JOIN yazilabilir(Default JOIN yöntemidir) (kullanim INNER JOIN))

--SELECT * FROM Artist AS art JOIN Album AS alb ON alb.ArtistId = art.ArtistId ORDER BY alb.ArtistId, alb.AlbumId --JOIN = INNER JOIN

/*
SELECT c.FirstName, c.LastName, c.Country, i.InvoiceId, i.InvoiceDate, i.Total AS InvoiceTotal
FROM Customer AS c
INNER JOIN Invoice AS i ON i.CustomerId = c.CustomerId
ORDER BY c.CustomerId
*/
/*
SELECT t.Name Sarki, a.Title Album, m.Name Dosya, g.Name Tur
FROM Track t
INNER JOIN Album a ON a.AlbumId=t.AlbumId --Esittirin önünde veya arkasinda olmasi önemsizdir
INNER JOIN MediaType m ON t.MediaTypeId=m.MediaTypeId
INNER JOIN Genre g ON g.GenreID=t.GenreId
*/

--* LEFT JOIN* --üstteki (FROM) tablodaki bütün kyitlari getir Join Tablosundaki kesisen kayitlari getir
/*
SELECT * 
FROM Artist AS art 
LEFT JOIN Album AS alb ON alb.ArtistId = art.ArtistId 
ORDER BY ArtistId ASC, AlbumId ASC
*/
-- * RIGHT JOIN -- Üst (FROM) tablodaki KESİŞEN kayıtlar ve JOIN tablodaki BÜTÜN kayıtları getir.
/*
SELECT *
FROM Artist AS art
RIGHT JOIN Album AS alb ON alb.ArtistId=art.ArtistId
ORDER BY ArtistId ASC, AlbumId ASC
*/

-- * FULL OUTER JOIN -- Her iki tablonun BÜTÜN kayıtlarını göster, Eşleşenleri yanyana göster.
/*
SELECT *
FROM Artist AS art
FULL OUTER JOIN Album AS alb ON alb.ArtistId=art.ArtistId
ORDER BY ArtistId ASC, AlbumId ASC
*/

-- * CROSS JOIN -- Her iki tablonun BÜTÜN kayıtlarını göster, İlişki gözetme.
/*
SELECT *
FROM Artist AS art
CROSS JOIN Album AS alb
ORDER BY ArtistId ASC, AlbumId ASC
*/

/*
-- Genel/Kısa Kullanım:
SELECT *
FROM Artist AS art, Album AS alb
ORDER BY ArtistId ASC, AlbumId ASC
*/

-- * JOIN ÖRNEKLER
/*
-- Hangi sanatçı hangi albümleri çıkarmıştır. Bir albüme sahip olmayan sanatçıları gösterme. Sadece albüm sahibi olan sanatçıları göster.
SELECT t1.ArtistId, t1.Name AS sanatci, t2.Title AS album
FROM Artist AS t1
INNER JOIN Album AS t2 ON t1.ArtistId=t2.ArtistId
-- WHERE t1.Name = 'Led Zeppeli'
ORDER BY t1.ArtistId
/*
-- Bütün sanatçıları göster. Hangi sanatçı hangi albüme sahip onu da göster. Ama albüm sahibi olmayan kayıtlara NULL yaz.
SELECT t1.ArtistId, t1.Name AS sanatci, t2.Title AS album
FROM Artist AS t1
LEFT JOIN Album AS t2 ON t2.ArtistId=t1.ArtistId
ORDER BY t1.ArtistId
*/