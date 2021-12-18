<div class="fr-view">
<h2>A kész feladat feltöltésének helye:</h2>
<p>Repo: <strong>str2-sajat-munka</strong></p>
<p>Almappa:<strong>&nbsp;scss-feladatok-sitebuilding</strong></p>
<p>Például: <strong>http://github</strong><strong>.com/cherryApp/</strong><strong>str2-sajat-munka/scss-feladatok-sitebuilding</strong></p>
<p><br></p>
<h1 id="bootstrap-4-sitebuilding-project">SCSS sitebuilding projekt</h1>
<p><strong>A letölthető fájlok a leírás végén találhatóak. A desktop PDF-fájl fel van címkézve a feladatok szövegével.</strong></p>
<p><strong>Készítsd el a <em>desktop.jpeg/mobile.jpeg</em> képen látható reszponzív honlapot SCSS segítségével!</strong><br><strong>CSS-keretrendszer használata nem megengedett! (Kivéve a rácsrendszernél a Bootstrap.)</strong></p>
<p><strong><span style="color: rgb(41, 105, 176);">A feladat ugyanaz, mint a Bootstrap 4 tanfolyam projektjénél, csak a megvalósítási módja más.</span></strong></p>
<p>Összesen 2 nézetünk van. Bootstrap segítségével állítsd be: a large breakpoint (992px) felett a desktop, alatta a mobil view érvényesüljön! &nbsp;A dizájnhoz használt képeket megtalálod az <em>img</em> mappában. Használj egyéni betűtípusokat – Google Fonts-ról le kell tölteni, és CSS-ben egyéni betűtípusokat kell létrehozni az alábbiak szerint:</p>
<ul>
<li>A címsorok és menük betűtípusa: Catamaran, Helvetica, Arial, sans-serif</li>
<li>Gombok szövege, felső menü linkek: Lato, Helvetica, Arial, sans-serif</li>
<li>Bekezdések: Muli, Helvetica, Arial, sans-serif</li>
<li>A footer egységesen: Muli, Helvetica, Arial, sans-serif</li>
</ul>
<p>A használni kívánt színeket mérd ki! Pontosan meg kell felelni a dizájn színeinek (color picker-t használd)! A margin-, padding-értékeknek, betűméreteknek, sormagasságoknak stb. nem kell pixelpontosnak lennie, de szemre lőjük be, ne térjen el nagyon a dizájnon lévőtől! A feladatok leírását a <em>desktop.pdf</em> fájl tartalmazza megjegyzések formájában, de itt is olvashatod:</p>
<p><strong><em>Start Bootstrap szöveg (a bal felső sarokban):</em></strong> - Ha fölé visszük a kurzort, fehér lesz a betűszín.</p>
<p><em><strong>Felső navbar:</strong></em></p>
<ul>
<li>Ha a menü item fölé visszük a kurzort, fehér lesz a betűszín.</li>
<li>Nem új oldalra vezető linkek, hanem az adott oldalon belüli részhez animálódva le-/felgördül az oldal.<ul>
<li>A Download a <em>Discover what all the buzz is about!</em> részhez</li>
<li>A Feature az <em>Unlimited Features Unlimited Fun</em> részhez</li>
<li>A Contact a <em>We love new friends!</em> részhez</li>
</ul>
</li>
<li>Ez a gördüléses animáció 300ms időtartamú legyen, ez az az idő, amely alatt felülre kerül az adott tartalmi rész.</li>
<li>A felső menü fixen, mindig látható felül. Ha nem az oldal tetején vagyunk, akkor legyen a menü háttérszíne fehér, a betűk szürkék (desktop-menu.pdf szerint).</li>
</ul>
<p><strong><em>Gombok:</em></strong></p>
<ul>
<li>Lekerekítettek</li>
<li>Ha föléjük visszük a kurzort, sárga lesz a háttérszínük és a border színe is (#fdcc52). Ez 300ms alatt történjen meg, ne rögtön.</li>
</ul>
<p><strong><em>Felső rózsaszín-lila rész:</em></strong></p>
<ul>
<li>Ez egy linear gradient plusz egy kép repeatelve</li>
<li>A kép a bg-pattern.png</li>
</ul>
<p><strong><em>Discover what all the buzz is about! rész</em></strong></p>
<ul>
<li>Két kép lesz linkként használva (app-store-badge.svg, google-play-badge.svg)</li>
<li>Ezek olyan képlinkek, amelyek az App Store és a Google Play oldalakra vezetnek.</li>
</ul>
<p><strong><em>Unlimited Features Unlimited Fun rész</em></strong></p>
<ul>
<li>A jobb oldali 4-es csoportnál embed row-t használj</li>
<li>Az ikonok sima UTF-8 karakterek, vagy használd a Simple Line Icons készletet</li>
</ul>
<p><strong><em>Stop Waiting Start Building rész</em></strong></p>
<ul>
<li>A háttéren egy áttetsző „szűrő" van</li>
<li>Ha a gomb fölé visszük a kurzort, sárga lesz a háttér színe és a border színe is (#fdcc52)</li>
</ul>
<p><strong><em>We love new friends! rész</em></strong></p>
<ul><li>
<p>A social-ikonoknál:</p>
<ul>
<li>A háttérszín 90%-os alpha-értékkel rendelkezik</li>
<li>Ha fölé viszem a kurzort, akkor lesz 100% alpha-érték</li>
<li>Használj Font Awesome-ikonokat</li>
<li>Az ikonok linkek az adott social page-re</li>
<li>Mindegyik ikonnak legyen tooltipje, tehát ha fölé viszem a kurzort, megjelenik az adott social page neve (Facebook, Twitter, Google Plus: a Google+ megszűnt, ehelyett bármely más Google-oldalra vezető link megfelel)</li>
</ul>
</li></ul>
<p><strong><em>Footer</em></strong></p>
<ul>
<li>Sima linkek. Ha föléjük visszük a kurzort, sárga lesz a betűk színe (#fdcc52)</li>
<li>Nem új oldalra vezetnek, hanem mindegyik 1-1 külön modalt nyit</li>
<li>Tehát 3 modal lesz: egy Terms, egy Privacy és egy FAQ</li>
<li>Elég, ha ezeknek a modaloknak a title-je különbözik, a body lehet egy egyszerű lorem ipsum. A modal nyitását jQuery-vel oldjuk meg</li>
</ul>
<p><strong>Fájlok:&nbsp;</strong><a class="fr-file" href="https://s3.amazonaws.com/thinkific/file_uploads/219412/attachments/8a4/22d/733/bootstrap-sitebuilding-project.zip" target="_blank">sitebuilding-project.zip</a></p>
</div>