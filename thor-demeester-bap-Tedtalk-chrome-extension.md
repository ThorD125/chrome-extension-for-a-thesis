---
theme: "white"
transition: "zoom"
---

# Chrome Extension Webpentesting Framework

Door Thor.

<img src="powerpoint/flyer.png" alt="start" style="border-radius:15px"  style="border-radius:15px">

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

<img alt="XML External Entity (XXE) Injection" src="./powerpoint/xxe_external_entitys_results.png" style="border-radius:15px">

---

<img alt="Popup" src="readme/popup.png"  style="border-radius:15px">

---

## Wie weet wat extensies zijn?

---

## Wie weet wat extensies zijn?

<small>Dit zijn javascript scripts die uw browser uitbreiden</small>

---

## Hoe het begon -- Leho

<img alt="leho" src="readme/leho.png"  style="border-radius:15px">

note: het begon met leho je kan hier documenten op zien
note: maar deze worden vaak maar voor de helft getoond op een klein scherm

---

<img alt="Bookmarklet van 'fix me'" src="powerpoint/fixme.png"  style="border-radius:15px">

note: dus in het eerste jaar schreef ik hier al een bookmarklet
note: maar hier moest ik dan iedere keer op klikken als ik een nieuw document opende
note: hierna hing ik opzoek naar hoe ik dit automatisch kon doen en toen kwam ik in de wereld van extensies

---

## Hoe zitten extensies in elkaar

<img src="powerpoint/flyer.png" alt="start"   style="border-radius:15px">

note: deze kunnen allemaal js modules zijn buiten de content
note: probleem van de scopes uitleggen
note: probleem met storage

---

## XML

<img alt="xml example" class="r-stretch" src="powerpoint/xml_example.png"  style="border-radius:15px">

note: eerst maakte ik een xml inclusion attack 

---

## Modularize

<img alt="one to many" class="r-stretch" src="powerpoint/one to many.webp"  style="border-radius:15px">

note: hierna modularizeerde ik mijn code, tot nu toe had ik alles en 1 bestand
note: maar dit was niet haalbaar om naar meerdere exploits uit te breiden
note: dus maakte ik een "listener"
note: deze hadden de functie om te "luisteren" off er op een site een exploit mogelijk was, en dan een exploit uit te voeren

---

## Results

note: eerst developte ik zo:

<img alt="insert image van hoe ik eerst developte" src="powerpoint/first_deving.png"  style="border-radius:15px">

---

<img alt="hoe ik resultaten erna zag" src="powerpoint/last_result.png"  style="border-radius:15px">

---

<img alt="Popup" src="readme/popup.png"  style="border-radius:15px">

note: en hierna maakte ik het popup scherm
note: zodat je gemakkelijk de resultaten kan zien

---

### QUESTIONS?

---

### Thanks
