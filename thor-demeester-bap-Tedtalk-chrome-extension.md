---
theme: "white"
transition: "zoom"
---


# Chrome Extension Webpentesting Framework

<img src="powerpoint/start.png" alt="start" class="r-stretch">

---

## Wie ben ik

<small>
Ik ben Thor, een student Cyber Security aan Howest.
</small>

note: en in mijn vrije tijd doe ik mee aan ctf's en pentest ik

---

## Idee

<small>
Kan ik webpentesting meer automatiseren in Chrome?
</small>

note: in men chrome browser
note: --- erin want ik zet niet supergraag superveel open
note: ik gebruik al veel extensies,
note: dus wat als ik zelf een extension maak die meerdere exploits automatisch uitvoert

---

note: use case

Voorbeeld van use cases op portswigger labs
![postmessage Vulnerabilitie identifying](./powerpoint/postmessage_identify.jpg)

--

![Path Traversal](./powerpoint/filetraversal_hard.png)

--

![XML External Entity (XXE) Injection](./powerpoint/xxe_external_entitys_results.png)

--

![XInclude Attacks](./powerpoint/x_include.png)

---

## Hoe het begon -- Leho

<img alt="leho" src="readme/leho.png">

note: het begon met leho je kan hier documenten op zien
note: maar deze worden vaak maar voor de helft getoond op een klein scherm

---

<img alt="Bookmarklet van 'fix me'" src="powerpoint/fixme.png">

note: dus in het eerste jaar schreef ik hier al een bookmarklet
note: maar hier moest ik dan iedere keer op klikken als ik een nieuw document opende
note: hierna hing ik opzoek naar hoe ik dit automatisch kon doen en toen kwam ik in de wereld van extensies

---

## Wie weet wat extensies zijn?

---

## Wie weet wat extensies zijn?

<small>Dit zijn javascript scripts die uw browser uitbreiden</small>

---

## Hoe zitten extensies in elkaar

<img alt="1diagram met alle onderdelen" class="r-stretch" src="powerpoint/parts_schema.png">

note: deze kunnen allemaal js modules zijn buiten de content
note: probleem van de scopes uitleggen
note: probleem met storage

---

## XML

note: eerst maakte ik een xml inclusion attack

---

## Modularize

note: hierna modularizeerde ik mijn code, tot nu toe had ik alles en 1 bestand
note: maar dit was niet haalbaar om naar meerdere exploits uit te breiden
note: dus maakte ik een "listener"
note: deze hadden de functie om te "luisteren" off er op een site een exploit mogelijk was, en dan een exploit uit te voeren

---

## Results

note: eerst developte ik zo:

<img alt="insert image van hoe ik eerst developte" src="powerpoint/first_deving.png">

---

<img alt="hoe ik resultaten erna zag" src="powerpoint/last_result.png">

---

<img alt="Popup" src="readme/popup.png">

note: en hierna maakte ik het popup scherm
note: zodat je gemakkelijk de resultaten kan zien

---

### Thanks
