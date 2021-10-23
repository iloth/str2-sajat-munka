<div class="fr-view">
<h2>A kész feladat feltöltésének helye:</h2>
<p>Repo: <strong>str2-sajat-munka</strong></p>
<p>Almappa:<strong>&nbsp;css-feladatok-admin</strong></p>
<p>Például: <strong>http://github</strong><strong>.com/cherryApp/</strong><strong>str2-sajat-munka/css<strong>-feladatok-admin</strong></strong></p>
<p><br></p>
<h3>CSS3 Projekt</h3>
<p>A feladat, hogy hozz létre egy adminfelületet HTML5 és CSS3 segítségével.</p>
<h4>Általános jellemzők</h4>
<ul>
<li>A projektet töltsd fel a fenti GitHub-repóba!</li>
<li>Egy HTML-fájl szükséges, a neve "<strong>index.html</strong>" legyen, csupa kisbetűvel, és a gyökérben helyezd el.</li>
<li>Kapsz egy képet, ez alapján kell elkészítened a kinézetet.</li>
<li>A színkódokat és az elvárt osztályneveket megkapod. A színkódokat mindenhol RGB-formátumban adjuk meg.</li>
<li>Ahol nincs részletesen specifikálva a feladat, ott az előnézet alapján dolgozz.</li>
<li>Mindenhol Font Awesome-ikonokat használj:<br><a href="https://fontawesome.com/v4.7.0/assets/font-awesome-4.7.0.zip">https://fontawesome.com/v4.7.0/assets/font-awesome-4.7.0.zip</a><br>miután letöltötted, csomagold ki a css-mappádba, és hivatkozz a benne található css/font-awesome.min.css fáljra az index.html-ben.</li>
</ul>
<h4>Header</h4>
<ul>
<li>Hozz létre az oldalon egy header elemet.</li>
<li>A CSS-osztálya "header--dark" legyen.</li>
<li>Háttérszín: 51,57,64</li>
<li>Kitöltőszín: 236,236,236<br><br>
</li>
<li>Hozz létre egy h3 elemet a header-ön belül az oldal címének.</li>
<li>A CSS-osztálya "header__title" legyen.</li>
<li>Inline elem legyen.</li>
<li>A betűmérete 1.25-szöröse legyen a root-betűméretnek.</li>
<li>A tartalma "Admin Page" legyen.<br><br>
</li>
<li>Hozz létre egy kereső űrlapot a header jobb oldalán.</li>
<li>Ez egy div legyen "header__search" osztállyal.</li>
<li>Inline legyen megjelenítve.<br><br>
</li>
<li>Legyen a header__search osztályú divben egy input elem és egy gomb.</li>
<li>Az input elem osztálya "search__input" legyen.</li>
<li>Legyen a bal felső és alsó sarka 4 pixelre lekerekítve.</li>
<li>A jobb-bal padding 0.75, a felső-alsó 0.375 legyen a roothoz viszonyítva.</li>
<li>A betűmérete 1.2 legyen a roothoz viszonyítva.</li>
<li>A szegély színére állíts be egy áttűnést, amely .15 másodpercig tart.</li>
<li>Ha megkapja a fókuszt, akkor a szegély színe 128,189,255 legyen.</li>
<li>A gomb elem osztálya "search__btn" legyen.</li>
<li>A gomb háttérszíne 0,123,255 legyen.</li>
<li>A nagyító ikont keresd meg a Font Awesome-ikonok között, és jelenítsd meg a gomb közepén a minta alapján.</li>
</ul>
<h4>Main</h4>
<ul>
<li>Hozz létre egy main elemet a header alá.&nbsp;</li>
<li>Legyen benne egy aside elem.</li>
<li>Mellette egy section elem "content" osztállyal.</li>
</ul>
<h4>Aside</h4>
<ul>
<li>Legyen benne egy nav elem "main__nav" osztállyal.</li>
<li>Legyen a háttérszíne 33,37,41</li>
<li>Legyen benne egy ul elem "nav__ul" osztállyal.</li>
<li>Legyen benne 8 li elem.</li>
<li>Az li elemekben legyenek fejlécek vagy linkek a minta szerinti tartalommal.</li>
<li>Az ikonokat is a minta szerint helyezd el a linkek szövege elé, sorrendben:<br><code>fa-tachometer,&nbsp;</code><code>fa-windows,&nbsp;</code><code>fa-bookmark,&nbsp;</code><code>fa-area-chart,&nbsp;</code><code>fa-table</code>
</li>
</ul>
<h4>Section</h4>
<ul>
<li>Legyen a tetején egy h1 elem "Dashboard" tartalommal.</li>
<li>Alatta legyen egy breadcrumb, ez egy div legyen "main__breadcrumb" osztállyal.</li>
<li>Háttérszíne 233,236,239 legyen.</li>
<li>A szegély lekerekítése .25 legyen a roothoz képest.</li>
<li>A felirat benne szintén "Dashboard" legyen.</li>
<li>A padding fent-lent 1, jobb-bal oldalon 1.5 legyen a roothoz képest.</li>
<li>Legyen egy div alatta "main__cards" osztállyal.</li>
<li>Legyen benne további négy div "main__card" osztállyal.</li>
<li>A main__card divek legyen elosztva két további divre, ezek osztályai "card__top" és "card__bottom" legyenek.</li>
<li>A felsőnek a felső, az alsónak az alsó sarkai legyenek lekerekítve .25 -re a roothoz képest.</li>
<li>Mind a négy divhez hozz létre még egy-egy osztályt, és rendeld hozzájuk a diveket:<ul>
<li>main__card--blue: háttérszín 0,123,255</li>
<li>main__card--yellow: háttérszín 255,193,7</li>
<li>main__card--green: háttérszín 40,167,69</li>
<li>main__card--red: háttérszín 220,53,69</li>
</ul>
</li>
<li>Állíts be áttűnést a háttérszínre az összes alsó és felső div esetén .3 másodperc időtartamban.</li>
<li>A divek tartalma a minta szerint legyen elkészítve.</li>
</ul>
<h4>Opcionális</h4>
<ul>
<li>700px alatt a bal oldali menü legyen keskenyebb, és csak a menüpontok ikonjai látsszanak.</li>
<li>700px alatt a kártyák egymás alatt legyenek.</li>
</ul>
<h4>Minta</h4>
<p><img src="https://files.cdn.thinkific.com/file_uploads/219412/images/d1d/42a/dca/preview-latest.JPG" style="width: 845px;" class="fr-fic fr-dib" srcset="https://files.cdn.thinkific.com/file_uploads/219412/images/d1d/42a/dca/preview-latest.JPG?width=1920 1x, https://files.cdn.thinkific.com/file_uploads/219412/images/d1d/42a/dca/preview-latest.JPG?width=1920&amp;dpr=2 2x, https://files.cdn.thinkific.com/file_uploads/219412/images/d1d/42a/dca/preview-latest.JPG?width=1920&amp;dpr=3 3x"></p>
</div>