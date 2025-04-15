# Rehacktor Games

Sito che ti permette di vedere videogiochi, con rating, descrizione, possibilità di aggiungerli ai preferiti e una live chat dove gli utenti loggati possono scrivere in tempo reale nella pagina del gioco.

## API

- API giochi: [RAWG](https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-12-31&page=1)
- BaaS: [Supabase](https://supabase.com)

## Stile

Tailwind CSS, Material Tailwind, UIverse per i form, Toast per gli alert e un loader esterno.

## Pagine

1. Home page con lista giochi
2. Pagina dei generi
3. Pagina dettaglio gioco
4. Login/Register
5. Pagina risultati ricerca
6. Pagina impostazioni profilo

## User Interactions

1. Utente non autenticato può navigare sul sito e guardare i generi, ma non può compiere azioni salvate
2. Utente non autenticato può cercare giochi per nome
3. Utente non autenticato può registrarsi
4. Utente autenticato può creare lista di giochi preferiti
5. Utente autenticato può scrivere nella live chat
6. Utente autenticato può modificare il profilo

## Context

Utilizzato per gestire:
- La sessione utente (autenticazione)
- I giochi preferiti (FavoritesContext)

## Deployment

[https://rehacktor-games.vercel.app](https://rehacktor-games.vercel.app)