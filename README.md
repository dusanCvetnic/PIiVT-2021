# Projekat iz predmeta Praktikum - Internet i veb tehnologije - 2020/2021.
## Veb aplikacija za ponudu-potražnju privatnih časova
## Dušan Cvetnić 2017202297
## Struktura

* U direktorijumu [01-documentation](./01-documentation) se nalazi dokumentacija 
* U direktorijumu [02-resources](./02-resources) se nalazi sql fajl sa bazom podataka, Postman kolekcija sa svim zahtevima ka API-ju i dodatne slike
* U direktorijumu [03-back-end](./03-back-end) se nalazi kod sa pozadinskom logikom aplikacije
* U direktorijumu [04-front-end](./04-front-end) se nalazi kod sa klijentskom stranom aplikacije

## Pokretanje aplikacije

1. Na samom početku se putem naredbe cd 03-back-end i nakon toga se u terminalu pokrene naredba npm install kako bi se instalirali neophodni node moduli
2. Nakon sto je zavrseno instaliranje node modula se putem naredbe npm run start:dev pokrece pozadinska logika aplikacije
3. Otvara se novi terminal i sa cd 04-front-end/ se prelazi u folder sa klijentskom stranom aplikacije i pokrene se naredba npm install kako bi se instalirali neophodni node moduli
4. Nakon sto je zavrseno instaliranje node modula pokrece se aplikacija sa npm start i otvara se adresa http://localhost:3000
