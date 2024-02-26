```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: inserts string into text input then presses save
    note right of browser: triggers js event listener function which updates page with new content using the user input and submits a post request to new_note_spa
    browser->>server: sends Post request to new_note_spa with json containing user input and date

```
