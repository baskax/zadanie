Instalacja:

wymagany jest Node w wersji co najmniej 6.0, przed instalacją zalecane tez jest zaktualizowanie samego npm.

1. zakładamy, że elasticsearch jest zainstalowany, w katalogu data znajdują się dwa skrypty - mapping.sh definujący indeksy i ich mappingi, oraz plik insert.sh dodający dane do indeksu.
2. na katalogu wykonujemy polecenie npm install
3. serwer backendowy uruchamiamy poleceniem npm start - domyslnie uruchamiany jest na porcie 8110
4. serwer frontendowy (wersja dev) uruchamiana poleceniem npm run fstart, uruchamiane na porcie 3001
5. build produkcyjny uruchamiany poleceniem npm run build, na potrzeby tego projektu korzystałem z aplikacji prostego serwera serve, jednak możemy korzystać z dowolnego serwera http 
