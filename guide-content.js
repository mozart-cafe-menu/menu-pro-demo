/* ═══════════════════════════════════════════════════════════════
   GUIDE GeNext — Contenu des articles (5 langues)
   Chargé par guide.html — ne définit que la variable ARTICLES.
═══════════════════════════════════════════════════════════════ */
var ARTICLES = [

/* ───────────── ADMIN ───────────── */
{
  id:'adm-connexion', cat:'admin', img:'01-admin-login.webp',
  title:{
    fr:"Se connecter à votre panneau d'administration",
    en:'Signing in to your admin panel',
    el:'Σύνδεση στον πίνακα διαχείρισης',
    de:'Anmeldung im Admin-Bereich',
    es:'Iniciar sesión en su panel de administración'
  },
  imgAlt:{fr:"Écran de connexion de l'administration",en:'Admin login screen',el:'Οθόνη σύνδεσης διαχείρισης',de:'Admin-Anmeldebildschirm',es:'Pantalla de inicio de sesión'},
  body:{
    fr:"<p>Vous recevez un lien et un mot de passe par email dès la création de votre compte. Ouvrez ce lien sur ordinateur, tablette ou téléphone : aucune installation n'est nécessaire, tout se passe dans votre navigateur.</p><p>Saisissez votre mot de passe puis touchez <strong>Connexion</strong> — votre session reste ouverte tant que vous ne vous déconnectez pas vous-même.</p><p><strong>Mot de passe oublié ?</strong> Contactez-nous, nous vous en donnons un nouveau immédiatement.</p>",
    en:"<p>You receive a link and a password by email as soon as your account is created. Open this link on a computer, tablet or phone: no installation needed, everything happens in your browser.</p><p>Enter your password then tap the <strong>login button</strong> — your session stays open until you sign out yourself.</p><p><strong>Forgot your password?</strong> Contact us, we'll give you a new one immediately.</p>",
    el:'<p>Λαμβάνετε έναν σύνδεσμο και έναν κωδικό πρόσβασης μέσω email μόλις δημιουργηθεί ο λογαριασμός σας. Ανοίξτε τον σύνδεσμο σε υπολογιστή, tablet ή τηλέφωνο: δεν απαιτείται καμία εγκατάσταση, όλα γίνονται μέσα από τον περιηγητή σας.</p><p>Εισαγάγετε τον κωδικό σας και πατήστε το <strong>κουμπί σύνδεσης</strong> — η σύνδεσή σας παραμένει ανοιχτή μέχρι να αποσυνδεθείτε εσείς οι ίδιοι.</p><p><strong>Ξεχάσατε τον κωδικό σας;</strong> Επικοινωνήστε μαζί μας, θα σας δώσουμε αμέσως νέο.</p>',
    de:'<p>Sie erhalten einen Link und ein Passwort per E-Mail, sobald Ihr Konto erstellt wurde. Öffnen Sie diesen Link auf Computer, Tablet oder Handy: keine Installation nötig, alles läuft im Browser.</p><p>Geben Sie Ihr Passwort ein und tippen Sie auf die <strong>Anmelden-Schaltfläche</strong> — Ihre Sitzung bleibt geöffnet, bis Sie sich selbst abmelden.</p><p><strong>Passwort vergessen?</strong> Kontaktieren Sie uns, wir geben Ihnen sofort ein neues.</p>',
    es:'<p>Recibe un enlace y una contraseña por correo en cuanto se crea su cuenta. Abra ese enlace en ordenador, tableta o teléfono: no necesita instalar nada, todo ocurre en su navegador.</p><p>Introduzca su contraseña y toque el <strong>botón de inicio de sesión</strong> — su sesión permanece abierta hasta que usted mismo cierre sesión.</p><p><strong>¿Olvidó su contraseña?</strong> Contáctenos y le daremos una nueva de inmediato.</p>'
  },
  tip:{
    fr:"Ajoutez cette page à l'écran d'accueil de votre téléphone (menu du navigateur → « Ajouter à l'écran d'accueil ») pour l'ouvrir en un geste, comme une vraie application.",
    en:'Add this page to your phone\'s home screen (browser menu → "Add to Home Screen") to open it in one tap, like a real app.',
    el:'Προσθέστε αυτή τη σελίδα στην αρχική οθόνη του τηλεφώνου σας (μενού περιηγητή → «Προσθήκη στην αρχική οθόνη») για να την ανοίγετε με ένα άγγιγμα, όπως μια πραγματική εφαρμογή.',
    de:'Fügen Sie diese Seite dem Startbildschirm Ihres Handys hinzu (Browsermenü → „Zum Startbildschirm hinzufügen"), um sie mit einem Fingertipp zu öffnen, wie eine echte App.',
    es:'Añada esta página a la pantalla de inicio de su teléfono (menú del navegador → «Añadir a pantalla de inicio») para abrirla con un solo toque, como una app real.'
  },
  kw:{fr:['login','se connecter','mot de passe','identifiants'],en:['login','sign in','password'],el:['σύνδεση','κωδικός'],de:['anmelden','login','passwort'],es:['iniciar sesión','contraseña']}
},

{
  id:'adm-dashboard', cat:'admin', img:'02-admin-dashboard.webp',
  title:{
    fr:'Vue d\'ensemble : comment est organisé votre panneau',
    en:'Overview: how your panel is organized',
    el:'Επισκόπηση: πώς είναι οργανωμένος ο πίνακάς σας',
    de:'Übersicht: So ist Ihr Bereich aufgebaut',
    es:'Vista general: cómo está organizado su panel'
  },
  imgAlt:{fr:"Tableau de bord de l'administration",en:'Admin dashboard',el:'Πίνακας ελέγχου διαχείρισης',de:'Admin-Dashboard',es:'Panel de administración'},
  body:{
    fr:"<p>Votre panneau s'ouvre sur une liste de sections repliées, que vous dépliez en touchant leur titre : <strong>Design</strong> (thème et couleur), <strong>Fête active</strong>, <strong>Image principale</strong>, <strong>Infos</strong>, <strong>Note</strong>, puis vos <strong>Catégories</strong> et <strong>Produits</strong>.</p><p>Trois onglets en bas de l'écran séparent les grandes familles d'actions : <strong>Affichage Menu</strong> (ce que vos clients voient), <strong>Commandes & Appels</strong> (statistiques, QR codes, commandes), et <strong>Réglages</strong> (accès, langues, abonnement).</p><p>Chaque modification est enregistrée et visible par vos clients quasi instantanément — aucun bouton « Publier » séparé.</p>",
    en:'<p>Your panel opens on a list of collapsed sections, which you expand by tapping their title: <strong>Design</strong> (theme and color), <strong>Active event</strong>, <strong>Main image</strong>, <strong>Info</strong>, <strong>Note</strong>, then your <strong>Categories</strong> and <strong>Products</strong>.</p><p>Three tabs at the bottom of the screen separate the main families of actions: <strong>Menu Display</strong> (what your customers see), <strong>Orders & Calls</strong> (stats, QR codes, orders), and <strong>Settings</strong> (access, languages, subscription).</p><p>Every change is saved and visible to your customers almost instantly — no separate "Publish" button.</p>',
    el:'<p>Ο πίνακάς σας ανοίγει με μια λίστα από αναδιπλωμένες ενότητες, τις οποίες ανοίγετε πατώντας τον τίτλο τους: <strong>Design</strong> (θέμα και χρώμα), <strong>Ενεργή γιορτή</strong>, <strong>Κύρια εικόνα</strong>, <strong>Πληροφορίες</strong>, <strong>Σημείωση</strong>, και μετά τις <strong>Κατηγορίες</strong> και τα <strong>Προϊόντα</strong> σας.</p><p>Τρεις καρτέλες στο κάτω μέρος της οθόνης χωρίζουν τις βασικές οικογένειες ενεργειών: <strong>Εμφάνιση Μενού</strong> (αυτό που βλέπουν οι πελάτες σας), <strong>Παραγγελίες & Κλήσεις</strong> (στατιστικά, κωδικοί QR, παραγγελίες), και <strong>Ρυθμίσεις</strong> (πρόσβαση, γλώσσες, συνδρομή).</p><p>Κάθε αλλαγή αποθηκεύεται και είναι ορατή στους πελάτες σας σχεδόν αμέσως — χωρίς ξεχωριστό κουμπί «Δημοσίευση».</p>',
    de:'<p>Ihr Bereich öffnet sich mit einer Liste eingeklappter Abschnitte, die Sie durch Tippen auf ihren Titel öffnen: <strong>Design</strong> (Thema und Farbe), <strong>Aktives Fest</strong>, <strong>Hauptbild</strong>, <strong>Infos</strong>, <strong>Hinweis</strong>, dann Ihre <strong>Kategorien</strong> und <strong>Produkte</strong>.</p><p>Drei Reiter am unteren Bildschirmrand trennen die großen Aktionsfamilien: <strong>Menüanzeige</strong> (was Ihre Gäste sehen), <strong>Bestellungen & Rufe</strong> (Statistiken, QR-Codes, Bestellungen), und <strong>Einstellungen</strong> (Zugang, Sprachen, Abonnement).</p><p>Jede Änderung wird gespeichert und ist für Ihre Gäste fast sofort sichtbar — keine separate „Veröffentlichen"-Schaltfläche.</p>',
    es:'<p>Su panel se abre con una lista de secciones plegadas, que despliega tocando su título: <strong>Design</strong> (tema y color), <strong>Evento activo</strong>, <strong>Imagen principal</strong>, <strong>Información</strong>, <strong>Nota</strong>, y luego sus <strong>Categorías</strong> y <strong>Productos</strong>.</p><p>Tres pestañas en la parte inferior separan las grandes familias de acciones: <strong>Visualización del menú</strong> (lo que ven sus clientes), <strong>Pedidos y llamadas</strong> (estadísticas, códigos QR, pedidos), y <strong>Ajustes</strong> (acceso, idiomas, suscripción).</p><p>Cada cambio se guarda y es visible para sus clientes casi al instante — sin ningún botón «Publicar» separado.</p>'
  },
  kw:{fr:['tableau de bord','dashboard','onglets','sections'],en:['dashboard','tabs','sections'],el:['πίνακας','καρτέλες'],de:['dashboard','übersicht','reiter'],es:['panel','pestañas']}
},

{
  id:'adm-categories', cat:'admin', img:'02-admin-dashboard.webp',
  title:{
    fr:'Créer et organiser vos catégories',
    en:'Creating and organizing your categories',
    el:'Δημιουργία και οργάνωση των κατηγοριών σας',
    de:'Kategorien erstellen und organisieren',
    es:'Crear y organizar sus categorías'
  },
  imgAlt:{fr:'Liste des catégories du menu',en:'Menu category list',el:'Λίστα κατηγοριών μενού',de:'Liste der Menükategorien',es:'Lista de categorías del menú'},
  body:{
    fr:'<p>Une catégorie regroupe vos produits (ex : « Boissons Chaudes », « Pizzas »). Pour en créer une, dépliez la section <strong>Catégories</strong> puis touchez le bouton d\'ajout en bas de la liste.</p><ul><li>Maintenez l\'icône <strong>⋮⋮</strong> à gauche du nom pour glisser une catégorie à la position voulue — l\'ordre change immédiatement pour vos clients.</li><li>L\'icône <strong>👁</strong> masque temporairement une catégorie sans la supprimer (utile hors saison).</li><li>Le menu déroulant <strong>Chaud / Froid</strong> ajuste son icône visuelle.</li><li>La case <strong>Programmation horaire</strong> n\'affiche une catégorie qu\'à certaines heures (ex : petit-déjeuner le matin seulement).</li></ul>',
    en:'<p>A category groups your products (e.g. "Hot Drinks", "Pizzas"). To create one, expand the <strong>Categories</strong> section then tap the add button at the bottom of the list.</p><ul><li>Hold the <strong>⋮⋮</strong> icon left of the name to drag a category to the desired position — the order changes instantly for your customers.</li><li>The <strong>👁</strong> icon temporarily hides a category without deleting it (handy off-season).</li><li>The <strong>Hot / Cold</strong> dropdown adjusts its visual icon.</li><li>The <strong>Time schedule</strong> checkbox shows a category only at certain hours (e.g. breakfast menu, mornings only).</li></ul>',
    el:'<p>Μια κατηγορία ομαδοποιεί τα προϊόντα σας (π.χ. «Ζεστά Ροφήματα», «Πίτσες»). Για να δημιουργήσετε μία, ανοίξτε την ενότητα <strong>Κατηγορίες</strong> και πατήστε το κουμπί προσθήκης στο κάτω μέρος της λίστας.</p><ul><li>Κρατήστε πατημένο το εικονίδιο <strong>⋮⋮</strong> αριστερά από το όνομα για να σύρετε μια κατηγορία στη θέση που θέλετε — η σειρά αλλάζει αμέσως για τους πελάτες σας.</li><li>Το εικονίδιο <strong>👁</strong> αποκρύπτει προσωρινά μια κατηγορία χωρίς να τη διαγράφει (χρήσιμο εκτός σεζόν).</li><li>Το αναπτυσσόμενο μενού <strong>Ζεστό / Κρύο</strong> προσαρμόζει το εικονίδιό της.</li><li>Το πλαίσιο <strong>Χρονοπρογραμματισμός</strong> εμφανίζει μια κατηγορία μόνο σε συγκεκριμένες ώρες (π.χ. πρωινό μόνο το πρωί).</li></ul>',
    de:'<p>Eine Kategorie fasst Ihre Produkte zusammen (z. B. „Heiße Getränke", „Pizzen"). Zum Erstellen öffnen Sie den Abschnitt <strong>Kategorien</strong> und tippen auf die Hinzufügen-Schaltfläche unten in der Liste.</p><ul><li>Halten Sie das Symbol <strong>⋮⋮</strong> links vom Namen gedrückt, um eine Kategorie an die gewünschte Position zu ziehen — die Reihenfolge ändert sich sofort für Ihre Gäste.</li><li>Das Symbol <strong>👁</strong> blendet eine Kategorie vorübergehend aus, ohne sie zu löschen (praktisch außerhalb der Saison).</li><li>Das Dropdown <strong>Heiß / Kalt</strong> passt ihr visuelles Symbol an.</li><li>Das Kästchen <strong>Zeitplan</strong> zeigt eine Kategorie nur zu bestimmten Uhrzeiten an (z. B. Frühstück nur morgens).</li></ul>',
    es:'<p>Una categoría agrupa sus productos (ej.: «Bebidas calientes», «Pizzas»). Para crear una, despliegue la sección <strong>Categorías</strong> y toque el botón de añadir al final de la lista.</p><ul><li>Mantenga pulsado el icono <strong>⋮⋮</strong> a la izquierda del nombre para arrastrar una categoría a la posición deseada — el orden cambia al instante para sus clientes.</li><li>El icono <strong>👁</strong> oculta temporalmente una categoría sin eliminarla (útil fuera de temporada).</li><li>El menú desplegable <strong>Caliente / Frío</strong> ajusta su icono visual.</li><li>La casilla <strong>Programación horaria</strong> muestra una categoría solo en ciertas horas (ej.: desayuno solo por la mañana).</li></ul>'
  },
  kw:{fr:['catégorie','ordre','glisser','masquer','horaire'],en:['category','order','drag','schedule'],el:['κατηγορία','σειρά'],de:['kategorie','reihenfolge'],es:['categoría','orden','horario']}
},

{
  id:'adm-produits', cat:'admin', img:'04-admin-produits.webp',
  title:{
    fr:'Ajouter et modifier un produit',
    en:'Adding and editing a product',
    el:'Προσθήκη και επεξεργασία προϊόντος',
    de:'Produkt hinzufügen und bearbeiten',
    es:'Añadir y editar un producto'
  },
  imgAlt:{fr:'Liste des produits par catégorie',en:'Product list by category',el:'Λίστα προϊόντων ανά κατηγορία',de:'Produktliste nach Kategorie',es:'Lista de productos por categoría'},
  body:{
    fr:"<p>Dans la section <strong>Produits</strong>, chaque catégorie affiche ses plats sous forme de vignettes. Touchez <strong>+ Ajouter un produit</strong> pour en créer un nouveau, ou touchez un produit existant pour modifier son nom, sa description, son prix et sa photo — dans les 5 langues.</p><p>L'icône <strong>👁</strong> masque un produit en rupture de stock sans le supprimer (il réapparaît dès que vous le réactivez), et le glisser-déposer change son ordre d'affichage.</p><p>Une photo nette et lumineuse augmente nettement l'envie d'achat — nous pouvons vous aider à les préparer si besoin.</p>",
    en:'<p>In the <strong>Products</strong> section, each category displays its dishes as tiles. Tap <strong>+ Add a product</strong> to create a new one, or tap an existing product to edit its name, description, price and photo — in all 5 languages.</p><p>The <strong>👁</strong> icon hides an out-of-stock product without deleting it (it reappears as soon as you reactivate it), and drag-and-drop changes its display order.</p><p>A sharp, well-lit photo noticeably increases customer appetite — we can help you prepare them if needed.</p>',
    el:'<p>Στην ενότητα <strong>Προϊόντα</strong>, κάθε κατηγορία εμφανίζει τα πιάτα της ως καρτέλες. Πατήστε <strong>+ Προσθήκη προϊόντος</strong> για να δημιουργήσετε ένα νέο, ή πατήστε σε ένα υπάρχον προϊόν για να επεξεργαστείτε το όνομα, την περιγραφή, την τιμή και τη φωτογραφία του — και στις 5 γλώσσες.</p><p>Το εικονίδιο <strong>👁</strong> αποκρύπτει ένα προϊόν που έχει εξαντληθεί χωρίς να το διαγράφει (επανεμφανίζεται μόλις το ενεργοποιήσετε ξανά), και η μεταφορά με σύρσιμο αλλάζει τη σειρά εμφάνισής του.</p><p>Μια καθαρή και φωτεινή φωτογραφία αυξάνει αισθητά την όρεξη των πελατών — μπορούμε να σας βοηθήσουμε να τις ετοιμάσετε αν χρειαστεί.</p>',
    de:'<p>Im Abschnitt <strong>Produkte</strong> zeigt jede Kategorie ihre Gerichte als Kacheln. Tippen Sie auf <strong>+ Produkt hinzufügen</strong>, um ein neues zu erstellen, oder auf ein bestehendes Produkt, um Name, Beschreibung, Preis und Foto zu bearbeiten — in allen 5 Sprachen.</p><p>Das Symbol <strong>👁</strong> blendet ein ausverkauftes Produkt aus, ohne es zu löschen (es erscheint wieder, sobald Sie es reaktivieren), und Ziehen ändert die Anzeigereihenfolge.</p><p>Ein scharfes, gut beleuchtetes Foto steigert den Appetit Ihrer Gäste spürbar — wir helfen Ihnen bei Bedarf gerne bei der Vorbereitung.</p>',
    es:'<p>En la sección <strong>Productos</strong>, cada categoría muestra sus platos como tarjetas. Toque <strong>+ Añadir producto</strong> para crear uno nuevo, o toque un producto existente para editar su nombre, descripción, precio y foto — en los 5 idiomas.</p><p>El icono <strong>👁</strong> oculta un producto agotado sin eliminarlo (reaparece en cuanto lo reactive), y arrastrar y soltar cambia su orden de visualización.</p><p>Una foto nítida y bien iluminada aumenta notablemente las ganas de pedirlo — podemos ayudarle a prepararlas si lo necesita.</p>'
  },
  tip:{
    fr:'Les badges comme « Populaire » ou « Nouveau » (visibles sur la fiche produit) attirent l\'œil de vos clients vers vos meilleures ventes.',
    en:'Badges like "Popular" or "New" (visible on the product page) draw your customers\' attention to your best sellers.',
    el:'Ετικέτες όπως «Δημοφιλές» ή «Νέο» (ορατές στην καρτέλα προϊόντος) τραβούν το βλέμμα των πελατών σας προς τις καλύτερες πωλήσεις σας.',
    de:'Abzeichen wie „Beliebt" oder „Neu" (sichtbar auf der Produktseite) lenken den Blick Ihrer Gäste auf Ihre Bestseller.',
    es:'Las insignias como «Popular» o «Nuevo» (visibles en la ficha del producto) atraen la atención de sus clientes hacia sus más vendidos.'
  },
  kw:{fr:['produit','plat','photo','prix','badge'],en:['product','dish','photo','price','badge'],el:['προϊόν','πιάτο','τιμή'],de:['produkt','gericht','preis'],es:['producto','plato','precio']}
},

{
  id:'adm-happyhour', cat:'admin', img:'04-admin-produits.webp',
  title:{
    fr:'Happy Hour et réductions sur un produit',
    en:'Happy Hour and discounts on a product',
    el:'Happy Hour και εκπτώσεις σε ένα προϊόν',
    de:'Happy Hour und Rabatte auf ein Produkt',
    es:'Happy Hour y descuentos en un producto'
  },
  imgAlt:{fr:'Liste des produits',en:'Product list',el:'Λίστα προϊόντων',de:'Produktliste',es:'Lista de productos'},
  body:{
    fr:"<p>En modifiant un produit, la section <strong>Prix</strong> propose une option <strong>Happy Hour</strong> : un second prix, réduit, qui remplace automatiquement le prix normal pendant une plage horaire et des jours de la semaine que vous choisissez.</p><p>Le prix normal s'affiche alors barré à côté du prix réduit sur le menu public — aucune action nécessaire de votre part une fois configuré, l'affichage bascule tout seul aux heures programmées, chaque semaine.</p>",
    en:'<p>When editing a product, the <strong>Price</strong> section offers a <strong>Happy Hour</strong> option: a second, discounted price that automatically replaces the normal price during a time window and days of the week you choose.</p><p>The normal price then shows crossed out next to the discounted one on the public menu — no action needed on your part once set up, the display switches on its own at the scheduled times, every week.</p>',
    el:'<p>Κατά την επεξεργασία ενός προϊόντος, η ενότητα <strong>Τιμή</strong> προσφέρει μια επιλογή <strong>Happy Hour</strong>: μια δεύτερη, μειωμένη τιμή που αντικαθιστά αυτόματα την κανονική τιμή σε ένα χρονικό διάστημα και ημέρες της εβδομάδας που επιλέγετε.</p><p>Η κανονική τιμή εμφανίζεται τότε διαγραμμένη δίπλα στη μειωμένη στο δημόσιο μενού — καμία ενέργεια δεν χρειάζεται από εσάς μετά τη ρύθμιση, η εμφάνιση αλλάζει μόνη της τις προγραμματισμένες ώρες, κάθε εβδομάδα.</p>',
    de:'<p>Beim Bearbeiten eines Produkts bietet der Bereich <strong>Preis</strong> eine <strong>Happy-Hour</strong>-Option: ein zweiter, ermäßigter Preis, der den normalen Preis automatisch während eines von Ihnen gewählten Zeitfensters und an gewählten Wochentagen ersetzt.</p><p>Der normale Preis wird dann durchgestrichen neben dem ermäßigten Preis im öffentlichen Menü angezeigt — nach der Einrichtung ist Ihrerseits nichts weiter zu tun, die Anzeige wechselt jede Woche von selbst zu den geplanten Zeiten.</p>',
    es:'<p>Al editar un producto, la sección <strong>Precio</strong> ofrece una opción <strong>Happy Hour</strong>: un segundo precio, reducido, que sustituye automáticamente al precio normal durante una franja horaria y unos días de la semana que usted elige.</p><p>El precio normal se muestra entonces tachado junto al precio reducido en el menú público — no se necesita ninguna acción por su parte una vez configurado, la visualización cambia sola a las horas programadas, cada semana.</p>'
  },
  kw:{fr:['happy hour','réduction','promotion','prix'],en:['happy hour','discount','promotion','price'],el:['happy hour','έκπτωση'],de:['happy hour','rabatt'],es:['happy hour','descuento']}
},

{
  id:'adm-themes', cat:'admin', img:'03-admin-design-theme.webp',
  title:{
    fr:'Changer de thème et de couleur',
    en:'Changing theme and color',
    el:'Αλλαγή θέματος και χρώματος',
    de:'Design und Farbe ändern',
    es:'Cambiar de tema y de color'
  },
  imgAlt:{fr:'Sélecteur de thèmes',en:'Theme selector',el:'Επιλογέας θεμάτων',de:'Design-Auswahl',es:'Selector de temas'},
  body:{
    fr:'<p>La section <strong>Design</strong> propose plus de 30 thèmes, répartis en 3 familles : <strong>Carte</strong> (épuré), <strong>Livre</strong> (façon carte de restaurant), et <strong>Élégant</strong> (immersif) — chaque produit peut afficher sa propre photo, quel que soit le thème choisi.</p><p>Touchez un thème pour l\'appliquer immédiatement à votre menu public, ou l\'icône <strong>🎨</strong> pour changer sa couleur d\'accent parmi plusieurs teintes.</p><p>Le réglage « Bouton thème pour vos visiteurs » laisse chaque client essayer un autre thème pour lui-même, sans jamais modifier votre configuration.</p>',
    en:'<p>The <strong>Design</strong> section offers more than 30 themes, split into 3 families: <strong>Card</strong> (minimalist), <strong>Book</strong> (restaurant-menu style), and <strong>Elegant</strong> (immersive) — every product can show its own photo, whichever theme you choose.</p><p>Tap a theme to apply it instantly to your public menu, or the <strong>🎨</strong> icon to change its accent color among several tones.</p><p>The "Theme button for your visitors" setting lets each customer try another theme just for themselves, without ever changing your configuration.</p>',
    el:'<p>Η ενότητα <strong>Design</strong> προσφέρει πάνω από 30 θέματα, χωρισμένα σε 3 οικογένειες: <strong>Κάρτα</strong> (λιτό), <strong>Βιβλίο</strong> (στυλ καταλόγου εστιατορίου), και <strong>Κομψό</strong> (εντυπωσιακό) — κάθε προϊόν μπορεί να εμφανίζει τη δική του φωτογραφία, όποιο θέμα κι αν επιλέξετε.</p><p>Πατήστε ένα θέμα για να το εφαρμόσετε αμέσως στο δημόσιο μενού σας, ή το εικονίδιο <strong>🎨</strong> για να αλλάξετε το χρώμα του ανάμεσα σε αρκετές αποχρώσεις.</p><p>Η ρύθμιση «Κουμπί θέματος για τους επισκέπτες σας» επιτρέπει σε κάθε πελάτη να δοκιμάσει άλλο θέμα μόνο για τον εαυτό του, χωρίς ποτέ να αλλάζει τη δική σας διαμόρφωση.</p>',
    de:'<p>Der Bereich <strong>Design</strong> bietet über 30 Themes in 3 Familien: <strong>Karte</strong> (schlicht), <strong>Buch</strong> (im Stil einer Restaurantkarte), und <strong>Elegant</strong> (immersiv) — jedes Produkt kann sein eigenes Foto zeigen, unabhängig vom gewählten Theme.</p><p>Tippen Sie auf ein Theme, um es sofort auf Ihr öffentliches Menü anzuwenden, oder auf das Symbol <strong>🎨</strong>, um die Akzentfarbe aus mehreren Tönen zu ändern.</p><p>Die Einstellung „Theme-Button für Ihre Besucher" lässt jeden Gast ein anderes Theme nur für sich selbst ausprobieren, ohne je Ihre Konfiguration zu ändern.</p>',
    es:'<p>La sección <strong>Design</strong> ofrece más de 30 temas, repartidos en 3 familias: <strong>Carta</strong> (minimalista), <strong>Libro</strong> (estilo carta de restaurante), y <strong>Elegante</strong> (inmersivo) — cada producto puede mostrar su propia foto, sea cual sea el tema elegido.</p><p>Toque un tema para aplicarlo al instante a su menú público, o el icono <strong>🎨</strong> para cambiar su color de acento entre varios tonos.</p><p>El ajuste «Botón de tema para sus visitantes» permite que cada cliente pruebe otro tema solo para sí mismo, sin modificar nunca su configuración.</p>'
  },
  kw:{fr:['thème','couleur','design','carte','livre','élégant'],en:['theme','color','design','card','book','elegant'],el:['θέμα','χρώμα'],de:['design','farbe','thema'],es:['tema','color','diseño']}
},

{
  id:'adm-couleur', cat:'admin',
  title:{
    fr:"Personnaliser la couleur d'accent",
    en:'Customizing the accent color',
    el:'Προσαρμογή του χρώματος έμφασης',
    de:'Die Akzentfarbe anpassen',
    es:'Personalizar el color de acento'
  },
  body:{
    fr:"<p>Sur un thème proposant plusieurs couleurs, l'icône <strong>🎨</strong> (à côté de son nom) ouvre une palette de teintes prêtes à l'emploi, assorties à l'ambiance du thème. Touchez-en une pour l'appliquer immédiatement à votre menu public.</p><p>Cette couleur s'applique à tous les accents visuels (boutons, badges, icônes) — vous pouvez en changer aussi souvent que vous le souhaitez, sans jamais perdre vos catégories ni vos produits.</p>",
    en:'<p>On a theme offering several colors, the <strong>🎨</strong> icon (next to its name) opens a palette of ready-made tones, matched to the theme\'s mood. Tap one to apply it instantly to your public menu.</p><p>This color applies to every visual accent (buttons, badges, icons) — you can change it as often as you like, without ever losing your categories or products.</p>',
    el:'<p>Σε ένα θέμα με πολλά χρώματα, το εικονίδιο <strong>🎨</strong> (δίπλα στο όνομά του) ανοίγει μια παλέτα έτοιμων αποχρώσεων, ταιριασμένων με την ατμόσφαιρα του θέματος. Πατήστε μία για να την εφαρμόσετε αμέσως στο δημόσιο μενού σας.</p><p>Αυτό το χρώμα εφαρμόζεται σε όλες τις οπτικές πινελιές (κουμπιά, ετικέτες, εικονίδια) — μπορείτε να το αλλάζετε όσο συχνά θέλετε, χωρίς ποτέ να χάνετε τις κατηγορίες ή τα προϊόντα σας.</p>',
    de:'<p>Bei einem Theme mit mehreren Farben öffnet das Symbol <strong>🎨</strong> (neben seinem Namen) eine Palette fertiger Farbtöne, passend zur Stimmung des Themes. Tippen Sie auf einen, um ihn sofort auf Ihr öffentliches Menü anzuwenden.</p><p>Diese Farbe gilt für alle visuellen Akzente (Schaltflächen, Abzeichen, Symbole) — Sie können sie so oft ändern, wie Sie möchten, ohne je Ihre Kategorien oder Produkte zu verlieren.</p>',
    es:'<p>En un tema con varios colores, el icono <strong>🎨</strong> (junto a su nombre) abre una paleta de tonos listos, a juego con el ambiente del tema. Toque uno para aplicarlo al instante a su menú público.</p><p>Este color se aplica a todos los acentos visuales (botones, insignias, iconos) — puede cambiarlo tantas veces como quiera, sin perder nunca sus categorías ni productos.</p>'
  },
  kw:{fr:['couleur','palette','accent','🎨'],en:['color','palette','accent'],el:['χρώμα','παλέτα'],de:['farbe','palette'],es:['color','paleta']}
},

{
  id:'adm-fete', cat:'admin',
  title:{
    fr:'Activer une animation pour les fêtes',
    en:'Enabling a festive animation',
    el:'Ενεργοποίηση εορταστικού εφέ',
    de:'Eine Feiertagsanimation aktivieren',
    es:'Activar una animación festiva'
  },
  body:{
    fr:"<p>La section <strong>Fête active</strong> propose une liste d'occasions (Noël, Pâques, Nouvel An, 25 Mars, 28 Octobre, Épiphanie, 15 Août, Carnaval...). Touchez-en une pour habiller votre menu public d'une animation discrète et thématique — une seule occasion active à la fois.</p><p>Touchez <strong>Aucune</strong> pour revenir à l'affichage normal. Un geste simple pour marquer les grandes occasions sans toucher au reste de votre menu.</p>",
    en:'<p>The <strong>Active event</strong> section offers a list of occasions (Christmas, Easter, New Year, national holidays, Epiphany, Carnival...). Tap one to dress your public menu with a discreet, themed animation — only one occasion active at a time.</p><p>Tap <strong>None</strong> to return to the normal display. A simple gesture to mark special occasions without touching the rest of your menu.</p>',
    el:'<p>Η ενότητα <strong>Ενεργή γιορτή</strong> προσφέρει μια λίστα περιστάσεων (Χριστούγεννα, Πάσχα, Πρωτοχρονιά, εθνικές γιορτές, Θεοφάνεια, Αποκριές...). Πατήστε μία για να ντύσετε το δημόσιο μενού σας με ένα διακριτικό, θεματικό εφέ — μόνο μία περίσταση ενεργή τη φορά.</p><p>Πατήστε <strong>Καμία</strong> για επιστροφή στην κανονική εμφάνιση. Μια απλή χειρονομία για να γιορτάσετε τις σημαντικές περιστάσεις χωρίς να αγγίξετε το υπόλοιπο μενού σας.</p>',
    de:'<p>Der Bereich <strong>Aktives Fest</strong> bietet eine Liste von Anlässen (Weihnachten, Ostern, Neujahr, Nationalfeiertage, Theophanie, Karneval...). Tippen Sie auf einen, um Ihr öffentliches Menü mit einer dezenten, thematischen Animation zu versehen — immer nur ein Anlass gleichzeitig aktiv.</p><p>Tippen Sie auf <strong>Keine</strong>, um zur normalen Anzeige zurückzukehren. Eine einfache Geste, um besondere Anlässe zu feiern, ohne den Rest Ihres Menüs anzufassen.</p>',
    es:'<p>La sección <strong>Evento activo</strong> ofrece una lista de ocasiones (Navidad, Semana Santa, Año Nuevo, fiestas nacionales, Epifanía, Carnaval...). Toque una para vestir su menú público con una animación discreta y temática — solo una ocasión activa a la vez.</p><p>Toque <strong>Ninguna</strong> para volver a la visualización normal. Un gesto simple para celebrar las grandes ocasiones sin tocar el resto de su menú.</p>'
  },
  kw:{fr:['fête','événement','noël','pâques','animation'],en:['event','christmas','easter','animation'],el:['γιορτή','χριστούγεννα'],de:['fest','weihnachten'],es:['fiesta','navidad']}
},

{
  id:'adm-commandes', cat:'admin', img:'06-admin-orders-tab.webp',
  title:{
    fr:'Suivre commandes et appels depuis l\'administration',
    en:'Tracking orders and calls from the admin panel',
    el:'Παρακολούθηση παραγγελιών και κλήσεων από τη διαχείριση',
    de:'Bestellungen und Rufe im Admin-Bereich verfolgen',
    es:'Seguir pedidos y llamadas desde la administración'
  },
  imgAlt:{fr:"Onglet Commandes & Appels",en:'Orders & Calls tab',el:'Καρτέλα Παραγγελίες & Κλήσεις',de:'Reiter Bestellungen & Rufe',es:'Pestaña Pedidos y llamadas'},
  body:{
    fr:"<p>L'onglet <strong>Commandes & Appels</strong> regroupe trois sections : <strong>Statistiques</strong> (visites, plats populaires), <strong>Tables & QR Codes</strong>, et <strong>Commandes</strong> (historique complet, avec le détail de chaque table).</p><p>C'est une vue de secours : au quotidien, votre équipe suit les commandes et les appels en direct depuis l'application Serveur sur son téléphone, avec une notification sonore à chaque nouvelle demande.</p>",
    en:'<p>The <strong>Orders & Calls</strong> tab groups three sections: <strong>Statistics</strong> (visits, popular dishes), <strong>Tables & QR Codes</strong>, and <strong>Orders</strong> (full history, with details for each table).</p><p>This is a backup view: day to day, your team follows orders and calls live from the Waiter App on their phone, with a sound notification for every new request.</p>',
    el:'<p>Η καρτέλα <strong>Παραγγελίες & Κλήσεις</strong> ομαδοποιεί τρεις ενότητες: <strong>Στατιστικά</strong> (επισκέψεις, δημοφιλή πιάτα), <strong>Τραπέζια & Κωδικοί QR</strong>, και <strong>Παραγγελίες</strong> (πλήρες ιστορικό, με λεπτομέρειες κάθε τραπεζιού).</p><p>Πρόκειται για μια εφεδρική προβολή: καθημερινά, η ομάδα σας παρακολουθεί τις παραγγελίες και τις κλήσεις σε πραγματικό χρόνο από την Εφαρμογή Σερβιτόρου στο τηλέφωνό της, με ηχητική ειδοποίηση για κάθε νέο αίτημα.</p>',
    de:'<p>Der Reiter <strong>Bestellungen & Rufe</strong> fasst drei Bereiche zusammen: <strong>Statistiken</strong> (Besuche, beliebte Gerichte), <strong>Tische & QR-Codes</strong>, und <strong>Bestellungen</strong> (vollständiger Verlauf, mit Details zu jedem Tisch).</p><p>Dies ist eine Reserveansicht: im Alltag verfolgt Ihr Team Bestellungen und Rufe live über die Kellner-App auf dem Handy, mit Tonbenachrichtigung bei jeder neuen Anfrage.</p>',
    es:'<p>La pestaña <strong>Pedidos y llamadas</strong> agrupa tres secciones: <strong>Estadísticas</strong> (visitas, platos populares), <strong>Mesas y códigos QR</strong>, y <strong>Pedidos</strong> (historial completo, con el detalle de cada mesa).</p><p>Es una vista de respaldo: en el día a día, su equipo sigue los pedidos y llamadas en directo desde la aplicación de camarero en su teléfono, con una notificación sonora en cada nueva solicitud.</p>'
  },
  kw:{fr:['commandes','appels','statistiques','historique'],en:['orders','calls','statistics','history'],el:['παραγγελίες','κλήσεις','στατιστικά'],de:['bestellungen','rufe','statistik'],es:['pedidos','llamadas','estadísticas']}
},

{
  id:'adm-statistiques', cat:'admin', img:'06-admin-orders-tab.webp',
  title:{
    fr:'Consulter vos statistiques',
    en:'Viewing your statistics',
    el:'Προβολή των στατιστικών σας',
    de:'Ihre Statistiken einsehen',
    es:'Consultar sus estadísticas'
  },
  imgAlt:{fr:'Section Statistiques',en:'Statistics section',el:'Ενότητα Στατιστικά',de:'Bereich Statistiken',es:'Sección Estadísticas'},
  body:{
    fr:"<p>La section <strong>Statistiques</strong> (onglet Commandes & Appels) donne une vue chiffrée de l'activité de votre menu : nombre de visites, plats les plus consultés, et volume de commandes ou d'appels sur la période.</p><p>Une manière simple de repérer vos plats les plus populaires — et de décider, par exemple, lesquels mettre en avant avec le badge <strong>« Populaire »</strong>.</p>",
    en:"<p>The <strong>Statistics</strong> section (Orders & Calls tab) gives a numeric view of your menu's activity: number of visits, most-viewed dishes, and volume of orders or calls over the period.</p><p>A simple way to spot your most popular dishes — and decide, for instance, which ones to highlight with the <strong>\"Popular\"</strong> badge.</p>",
    el:'<p>Η ενότητα <strong>Στατιστικά</strong> (καρτέλα Παραγγελίες & Κλήσεις) δίνει μια αριθμητική εικόνα της δραστηριότητας του μενού σας: αριθμό επισκέψεων, πιο δημοφιλή πιάτα, και όγκο παραγγελιών ή κλήσεων στη διάρκεια της περιόδου.</p><p>Ένας απλός τρόπος να εντοπίσετε τα πιο δημοφιλή σας πιάτα — και να αποφασίσετε, για παράδειγμα, ποια να αναδείξετε με την ετικέτα <strong>«Δημοφιλές»</strong>.</p>',
    de:'<p>Der Bereich <strong>Statistiken</strong> (Reiter Bestellungen & Rufe) gibt einen zahlenmäßigen Überblick über die Aktivität Ihres Menüs: Anzahl der Besuche, meistgesehene Gerichte, und Umfang der Bestellungen oder Rufe im Zeitraum.</p><p>Eine einfache Möglichkeit, Ihre beliebtesten Gerichte zu erkennen — und zu entscheiden, welche Sie zum Beispiel mit dem Abzeichen <strong>„Beliebt"</strong> hervorheben.</p>',
    es:'<p>La sección <strong>Estadísticas</strong> (pestaña Pedidos y llamadas) ofrece una vista numérica de la actividad de su menú: número de visitas, platos más vistos, y volumen de pedidos o llamadas en el período.</p><p>Una forma sencilla de detectar sus platos más populares — y decidir, por ejemplo, cuáles destacar con la insignia <strong>«Popular»</strong>.</p>'
  },
  kw:{fr:['statistiques','visites','plats populaires'],en:['statistics','visits','popular dishes'],el:['στατιστικά','επισκέψεις'],de:['statistik','besuche'],es:['estadísticas','visitas']}
},

{
  id:'adm-qrcodes', cat:'admin', img:'08b-admin-qrcodes.webp',
  title:{
    fr:'Générer vos codes QR de table',
    en:'Generating your table QR codes',
    el:'Δημιουργία κωδικών QR για τα τραπέζια',
    de:'Ihre Tisch-QR-Codes erstellen',
    es:'Generar sus códigos QR de mesa'
  },
  imgAlt:{fr:'Génération des QR codes',en:'QR code generation',el:'Δημιουργία κωδικών QR',de:'QR-Code-Erstellung',es:'Generación de códigos QR'},
  body:{
    fr:"<p>Dans <strong>Tables & QR Codes</strong>, indiquez le nombre de tables de votre établissement puis touchez <strong>Générer</strong> : un QR code unique est créé pour chaque table.</p><p>Le bouton <strong>PDF QR</strong> télécharge un document prêt à imprimer et à poser sur chaque table.</p><p>Quand un client scanne le code de sa table, son numéro de table est automatiquement transmis avec chaque appel ou commande — votre équipe sait exactement où se rendre.</p>",
    en:'<p>In <strong>Tables & QR Codes</strong>, enter the number of tables in your venue then tap <strong>Générer</strong>: a unique QR code is created for each table.</p><p>The <strong>PDF QR</strong> button downloads a print-ready document to place on each table.</p><p>When a customer scans their table\'s code, their table number is automatically sent with every call or order — your team knows exactly where to go.</p>',
    el:'<p>Στα <strong>Τραπέζια & Κωδικοί QR</strong>, εισαγάγετε τον αριθμό τραπεζιών του καταστήματός σας και πατήστε <strong>Générer</strong>: δημιουργείται ένας μοναδικός κωδικός QR για κάθε τραπέζι.</p><p>Το κουμπί <strong>PDF QR</strong> κατεβάζει ένα έγγραφο έτοιμο για εκτύπωση, για να το τοποθετήσετε σε κάθε τραπέζι.</p><p>Όταν ένας πελάτης σαρώνει τον κωδικό του τραπεζιού του, ο αριθμός του τραπεζιού μεταδίδεται αυτόματα με κάθε κλήση ή παραγγελία — η ομάδα σας ξέρει ακριβώς πού να πάει.</p>',
    de:'<p>Geben Sie unter <strong>Tische & QR-Codes</strong> die Anzahl der Tische Ihres Betriebs ein und tippen Sie auf <strong>Générer</strong>: für jeden Tisch wird ein eindeutiger QR-Code erstellt.</p><p>Die Schaltfläche <strong>PDF QR</strong> lädt ein druckfertiges Dokument herunter, das Sie auf jeden Tisch legen können.</p><p>Wenn ein Gast den Code seines Tisches scannt, wird seine Tischnummer automatisch bei jedem Ruf oder jeder Bestellung übermittelt — Ihr Team weiß genau, wohin es gehen muss.</p>',
    es:'<p>En <strong>Mesas y códigos QR</strong>, indique el número de mesas de su local y toque <strong>Générer</strong>: se crea un código QR único para cada mesa.</p><p>El botón <strong>PDF QR</strong> descarga un documento listo para imprimir y colocar en cada mesa.</p><p>Cuando un cliente escanea el código de su mesa, su número de mesa se transmite automáticamente con cada llamada o pedido — su equipo sabe exactamente adónde ir.</p>'
  },
  tip:{
    fr:"Un QR code affiché sans numéro de table fonctionne aussi (le client choisit sa table lui-même à l'écran) — pratique pour un comptoir à emporter ou une terrasse sans plan fixe.",
    en:'A QR code displayed without a table number also works (the customer picks their table on screen) — handy for a takeaway counter or a terrace with no fixed layout.',
    el:'Ένας κωδικός QR χωρίς αριθμό τραπεζιού λειτουργεί επίσης (ο πελάτης επιλέγει το τραπέζι του στην οθόνη) — χρήσιμο για πάγκο take-away ή βεράντα χωρίς σταθερή διάταξη.',
    de:'Ein QR-Code ohne Tischnummer funktioniert ebenfalls (der Gast wählt seinen Tisch selbst auf dem Bildschirm) — praktisch für eine Take-away-Theke oder eine Terrasse ohne festen Plan.',
    es:'Un código QR sin número de mesa también funciona (el cliente elige su mesa en la pantalla) — útil para un mostrador para llevar o una terraza sin disposición fija.'
  },
  kw:{fr:['qr code','table','pdf','générer'],en:['qr code','table','pdf','generate'],el:['qr','τραπέζι'],de:['qr-code','tisch'],es:['código qr','mesa']}
},

{
  id:'adm-reglages', cat:'admin', img:'08-admin-reglages-langues.webp',
  title:{
    fr:'Accès, mot de passe et langues',
    en:'Access, password and languages',
    el:'Πρόσβαση, κωδικός και γλώσσες',
    de:'Zugang, Passwort und Sprachen',
    es:'Acceso, contraseña e idiomas'
  },
  imgAlt:{fr:'Réglages d\'accès et de langue',en:'Access and language settings',el:'Ρυθμίσεις πρόσβασης και γλώσσας',de:'Zugangs- und Spracheinstellungen',es:'Ajustes de acceso e idioma'},
  body:{
    fr:"<p>L'onglet <strong>Réglages</strong> centralise le nom de votre établissement et votre mot de passe d'accès, modifiable à tout moment.</p><p>Activez ou désactivez chacune des 5 langues disponibles, choisissez la <strong>langue affichée aux clients par défaut</strong> (vos clients peuvent toujours la changer eux-mêmes), et la <strong>langue de votre personnel</strong> pour l'administration et l'application Serveur.</p>",
    en:'<p>The <strong>Settings</strong> tab centralizes your venue\'s name and your access password, editable at any time.</p><p>Turn each of the 5 available languages on or off, choose the <strong>default language shown to customers</strong> (your customers can always change it themselves), and the <strong>language for your staff</strong> for the admin panel and the Waiter App.</p>',
    el:'<p>Η καρτέλα <strong>Ρυθμίσεις</strong> συγκεντρώνει το όνομα του καταστήματός σας και τον κωδικό πρόσβασής σας, τροποποιήσιμο ανά πάσα στιγμή.</p><p>Ενεργοποιήστε ή απενεργοποιήστε καθεμία από τις 5 διαθέσιμες γλώσσες, επιλέξτε τη <strong>γλώσσα που εμφανίζεται στους πελάτες από προεπιλογή</strong> (οι πελάτες σας μπορούν πάντα να την αλλάξουν οι ίδιοι), και τη <strong>γλώσσα του προσωπικού σας</strong> για τη διαχείριση και την Εφαρμογή Σερβιτόρου.</p>',
    de:'<p>Der Reiter <strong>Einstellungen</strong> bündelt den Namen Ihres Betriebs und Ihr Zugangspasswort, jederzeit änderbar.</p><p>Aktivieren oder deaktivieren Sie jede der 5 verfügbaren Sprachen, wählen Sie die <strong>Standardsprache für Gäste</strong> (Ihre Gäste können sie jederzeit selbst ändern) und die <strong>Sprache Ihres Personals</strong> für den Admin-Bereich und die Kellner-App.</p>',
    es:'<p>La pestaña <strong>Ajustes</strong> centraliza el nombre de su local y su contraseña de acceso, modificable en cualquier momento.</p><p>Active o desactive cada uno de los 5 idiomas disponibles, elija el <strong>idioma mostrado a los clientes por defecto</strong> (sus clientes siempre pueden cambiarlo ellos mismos), y el <strong>idioma de su personal</strong> para la administración y la aplicación de camarero.</p>'
  },
  kw:{fr:['mot de passe','langue','accès','réglages'],en:['password','language','access','settings'],el:['κωδικός','γλώσσα'],de:['passwort','sprache'],es:['contraseña','idioma']}
},

{
  id:'adm-langue-ia', cat:'admin', img:'08-admin-reglages-langues.webp',
  title:{
    fr:'À quoi servent la langue principale et la traduction automatique',
    en:'What the primary language and automatic translation are for',
    el:'Σε τι χρησιμεύουν η κύρια γλώσσα και η αυτόματη μετάφραση',
    de:'Wofür die Hauptsprache und die automatische Übersetzung da sind',
    es:'Para qué sirven el idioma principal y la traducción automática'
  },
  imgAlt:{fr:'Réglages de langue',en:'Language settings',el:'Ρυθμίσεις γλώσσας',de:'Spracheinstellungen',es:'Ajustes de idioma'},
  body:{
    fr:"<p>Dans <strong>Réglages</strong>, la <strong>langue de votre personnel</strong> (dite langue principale) n'est pas qu'un simple confort d'affichage : c'est la langue dans laquelle vous devez toujours écrire vos catégories, produits et descriptions en premier. Dès que vous touchez <strong>Sauvegarder</strong>, notre IA traduit automatiquement tout ce que vous venez d'écrire dans les 4 autres langues activées — vous n'avez donc rien à taper vous-même dans les autres langues.</p><p>Si un jour vous corrigez vous-même un texte dans une autre langue (par exemple pour préciser une traduction), ce champ précis est alors « protégé » : l'IA ne l'écrasera plus jamais automatiquement, même si vous modifiez ensuite le texte d'origine et sauvegardez à nouveau. Pour qu'elle recommence à le traduire pour vous, il suffit de vider entièrement ce champ, puis de sauvegarder pendant que vous êtes sur votre langue principale — le texte sera alors régénéré automatiquement à partir de cette langue.</p><p>L'autre réglage, <strong>langue affichée aux clients par défaut</strong>, est différent : c'est simplement la langue dans laquelle s'ouvre votre menu la toute première fois qu'un nouveau client le scanne sur son téléphone. Chaque client peut ensuite la changer lui-même à tout moment avec les drapeaux, sans que cela affecte personne d'autre. Les deux réglages sont totalement indépendants — vous pouvez par exemple travailler en français et laisser le menu s'ouvrir en anglais pour vos clients.</p>",
    en:'<p>In <strong>Settings</strong>, the <strong>staff language</strong> (called the primary language) is not just a display preference: it is the language you should always write your categories, products and descriptions in first. As soon as you tap <strong>Save</strong>, our AI automatically translates everything you just wrote into the other 4 enabled languages — you never have to type anything yourself in the other languages.</p><p>If you ever correct a text yourself in another language (for example to refine a translation), that specific field becomes "protected": the AI will never automatically overwrite it again, even if you later change the original text and save again. To make the AI translate it again for you, simply clear that field completely, then save while you are on your primary language — the text will then be regenerated automatically from that language.</p><p>The other setting, <strong>default language shown to customers</strong>, is different: it is simply the language your menu opens in the very first time a new customer scans it on their phone. Each customer can then change it themselves at any time using the flags, without affecting anyone else. The two settings are completely independent — for example, you can work in French and let the menu open in English for your customers.</p>',
    el:'<p>Στις <strong>Ρυθμίσεις</strong>, η <strong>γλώσσα του προσωπικού</strong> σας (η λεγόμενη κύρια γλώσσα) δεν είναι απλώς μια ευκολία εμφάνισης: είναι η γλώσσα στην οποία πρέπει πάντα να γράφετε πρώτα τις κατηγορίες, τα προϊόντα και τις περιγραφές σας. Μόλις πατήσετε <strong>Αποθήκευση</strong>, η IA μας μεταφράζει αυτόματα ό,τι μόλις γράψατε στις άλλες 4 ενεργές γλώσσες — δεν χρειάζεται να πληκτρολογήσετε τίποτα μόνοι σας στις άλλες γλώσσες.</p><p>Αν κάποια στιγμή διορθώσετε εσείς οι ίδιοι ένα κείμενο σε άλλη γλώσσα (για παράδειγμα για να βελτιώσετε μια μετάφραση), αυτό το συγκεκριμένο πεδίο «προστατεύεται»: η IA δεν θα το αντικαταστήσει ποτέ ξανά αυτόματα, ακόμα κι αν αλλάξετε αργότερα το αρχικό κείμενο και αποθηκεύσετε ξανά. Για να αρχίσει ξανά να το μεταφράζει για εσάς, αρκεί να αδειάσετε εντελώς αυτό το πεδίο και μετά να αποθηκεύσετε ενώ βρίσκεστε στην κύρια γλώσσα σας — το κείμενο θα αναδημιουργηθεί τότε αυτόματα από αυτή τη γλώσσα.</p><p>Η άλλη ρύθμιση, <strong>γλώσσα που εμφανίζεται στους πελάτες από προεπιλογή</strong>, είναι διαφορετική: είναι απλώς η γλώσσα στην οποία ανοίγει το μενού σας την πρώτη φορά που ένας νέος πελάτης το σαρώνει στο κινητό του. Κάθε πελάτης μπορεί στη συνέχεια να την αλλάξει μόνος του ανά πάσα στιγμή με τις σημαίες, χωρίς αυτό να επηρεάζει κανέναν άλλον. Οι δύο ρυθμίσεις είναι εντελώς ανεξάρτητες — μπορείτε για παράδειγμα να δουλεύετε στα ελληνικά και να αφήσετε το μενού να ανοίγει στα αγγλικά για τους πελάτες σας.</p>',
    de:'<p>In den <strong>Einstellungen</strong> ist die <strong>Sprache Ihres Personals</strong> (Hauptsprache genannt) nicht nur eine Anzeigeeinstellung: Es ist die Sprache, in der Sie Ihre Kategorien, Produkte und Beschreibungen immer zuerst schreiben sollten. Sobald Sie auf <strong>Speichern</strong> tippen, übersetzt unsere KI automatisch alles, was Sie gerade geschrieben haben, in die anderen 4 aktivierten Sprachen — Sie müssen nie selbst etwas in den anderen Sprachen eintippen.</p><p>Wenn Sie einmal selbst einen Text in einer anderen Sprache korrigieren (zum Beispiel um eine Übersetzung zu verfeinern), wird genau dieses Feld „geschützt": Die KI wird es nie wieder automatisch überschreiben, selbst wenn Sie später den Originaltext ändern und erneut speichern. Damit die KI es wieder für Sie übersetzt, leeren Sie einfach dieses Feld vollständig und speichern Sie dann, während Sie sich in Ihrer Hauptsprache befinden — der Text wird dann automatisch aus dieser Sprache neu erstellt.</p><p>Die andere Einstellung, <strong>Standardsprache für Gäste</strong>, ist anders: Es ist einfach die Sprache, in der sich Ihr Menü öffnet, wenn ein neuer Gast es zum allerersten Mal auf seinem Handy scannt. Jeder Gast kann sie danach selbst jederzeit über die Flaggen ändern, ohne dass dies jemand anderen betrifft. Die beiden Einstellungen sind völlig unabhängig voneinander — Sie können zum Beispiel auf Deutsch arbeiten und das Menü für Ihre Gäste auf Englisch öffnen lassen.</p>',
    es:'<p>En <strong>Ajustes</strong>, el <strong>idioma de su personal</strong> (llamado idioma principal) no es solo una comodidad de visualización: es el idioma en el que siempre debe escribir primero sus categorías, productos y descripciones. En cuanto toque <strong>Guardar</strong>, nuestra IA traduce automáticamente todo lo que acaba de escribir a los otros 4 idiomas activados — no tiene que escribir nada usted mismo en los demás idiomas.</p><p>Si algún día corrige usted mismo un texto en otro idioma (por ejemplo para matizar una traducción), ese campo concreto queda entonces «protegido»: la IA ya no lo sobrescribirá nunca automáticamente, aunque después modifique el texto original y guarde de nuevo. Para que vuelva a traducirlo por usted, basta con vaciar por completo ese campo y luego guardar mientras está en su idioma principal — el texto se regenerará entonces automáticamente a partir de ese idioma.</p><p>El otro ajuste, <strong>idioma mostrado a los clientes por defecto</strong>, es diferente: es simplemente el idioma en el que se abre su menú la primerísima vez que un nuevo cliente lo escanea en su teléfono. Cada cliente puede después cambiarlo él mismo en cualquier momento con las banderas, sin que esto afecte a nadie más. Los dos ajustes son totalmente independientes — puede por ejemplo trabajar en español y dejar que el menú se abra en inglés para sus clientes.</p>'
  },
  tip:{
    fr:'Astuce : rédigez toujours en premier dans votre langue principale, puis sauvegardez — c\'est le geste le plus rapide pour obtenir un menu complet dans les 5 langues sans effort de traduction de votre part.',
    en:'Tip: always write first in your primary language, then save — it\'s the fastest way to get a complete menu in all 5 languages without any translation effort on your part.',
    el:'Συμβουλή: γράφετε πάντα πρώτα στην κύρια γλώσσα σας και μετά αποθηκεύστε — είναι ο πιο γρήγορος τρόπος για να έχετε ένα πλήρες μενού και στις 5 γλώσσες χωρίς καμία προσπάθεια μετάφρασης από εσάς.',
    de:'Tipp: Schreiben Sie immer zuerst in Ihrer Hauptsprache und speichern Sie dann — das ist der schnellste Weg zu einem vollständigen Menü in allen 5 Sprachen, ohne dass Sie selbst übersetzen müssen.',
    es:'Consejo: escriba siempre primero en su idioma principal y luego guarde — es la forma más rápida de tener un menú completo en los 5 idiomas sin ningún esfuerzo de traducción por su parte.'
  },
  kw:{fr:['langue principale','traduction','ia','automatique','verrou','protégé'],en:['primary language','translation','ai','automatic','lock','protected'],el:['κύρια γλώσσα','μετάφραση','ια'],de:['hauptsprache','übersetzung','ki'],es:['idioma principal','traducción','ia']}
},

{
  id:'adm-abonnement', cat:'admin', img:'09-admin-abonnement.webp',
  title:{
    fr:'Abonnement, paiement et assistance',
    en:'Subscription, payment and support',
    el:'Συνδρομή, πληρωμή και υποστήριξη',
    de:'Abonnement, Zahlung und Support',
    es:'Suscripción, pago y asistencia'
  },
  imgAlt:{fr:'Section Mon abonnement',en:'My subscription section',el:'Ενότητα Η συνδρομή μου',de:'Bereich Mein Abonnement',es:'Sección Mi suscripción'},
  body:{
    fr:"<p>Toujours dans <strong>Réglages</strong>, la section <strong>Mon abonnement</strong> rappelle votre formule active (Menu QR ou Commandes & Services) et son tarif annuel.</p><p>Vous y trouvez aussi un lien à partager pour recommander GeNext, et un bouton <strong>Nous contacter</strong> pour toute question — nous répondons rapidement, avant et après votre abonnement.</p>",
    en:'<p>Still in <strong>Settings</strong>, the <strong>My subscription</strong> section reminds you of your active plan (Menu QR or Orders & Services) and its annual price.</p><p>You\'ll also find a shareable link to recommend GeNext, and a <strong>Contact us</strong> button for any question — we reply quickly, before and after your subscription.</p>',
    el:'<p>Πάντα στις <strong>Ρυθμίσεις</strong>, η ενότητα <strong>Η συνδρομή μου</strong> σας υπενθυμίζει το ενεργό πακέτο σας (Menu QR ή Παραγγελίες & Υπηρεσίες) και την ετήσια τιμή του.</p><p>Εκεί θα βρείτε επίσης έναν σύνδεσμο για να προτείνετε το GeNext, και ένα κουμπί <strong>Επικοινωνήστε μαζί μας</strong> για κάθε ερώτηση — απαντάμε γρήγορα, πριν και μετά τη συνδρομή σας.</p>',
    de:'<p>Ebenfalls unter <strong>Einstellungen</strong> zeigt der Bereich <strong>Mein Abonnement</strong> Ihr aktives Paket (Menu QR oder Bestellungen & Service) und dessen Jahrespreis.</p><p>Dort finden Sie auch einen teilbaren Link, um GeNext zu empfehlen, und eine Schaltfläche <strong>Kontaktieren Sie uns</strong> für jede Frage — wir antworten schnell, vor und nach Ihrem Abonnement.</p>',
    es:'<p>Siempre en <strong>Ajustes</strong>, la sección <strong>Mi suscripción</strong> le recuerda su plan activo (Menu QR o Pedidos y Servicios) y su tarifa anual.</p><p>También encontrará un enlace para compartir y recomendar GeNext, y un botón <strong>Contáctenos</strong> para cualquier pregunta — respondemos rápidamente, antes y después de su suscripción.</p>'
  },
  kw:{fr:['abonnement','paiement','forfait','contact'],en:['subscription','payment','plan','contact'],el:['συνδρομή','πληρωμή'],de:['abonnement','zahlung'],es:['suscripción','pago']}
},

/* ───────────── SERVEUR ───────────── */
{
  id:'srv-installation', cat:'serveur', img:'11-server-app-home.webp', tall:true,
  title:{
    fr:"Installer et se connecter à l'application Serveur",
    en:'Installing and signing in to the Waiter App',
    el:'Εγκατάσταση και σύνδεση στην Εφαρμογή Σερβιτόρου',
    de:'Kellner-App installieren und anmelden',
    es:'Instalar e iniciar sesión en la aplicación de camarero'
  },
  imgAlt:{fr:"Écran d'accueil de l'application Serveur",en:'Waiter app home screen',el:'Αρχική οθόνη εφαρμογής σερβιτόρου',de:'Startbildschirm der Kellner-App',es:'Pantalla de inicio de la app de camarero'},
  body:{
    fr:"<p>L'application <strong>GeNext Staff</strong> s'installe sur le téléphone Android de votre équipe (fichier fourni par nos soins, aucun Play Store nécessaire).</p><p>Au premier lancement, saisissez l'identifiant de votre établissement — il reste enregistré ensuite, votre équipe n'a plus qu'à ouvrir l'application. L'indicateur <strong>Connecté</strong> en haut de l'écran confirme que tout fonctionne.</p>",
    en:'<p>The <strong>GeNext Staff</strong> app installs on your team\'s Android phone (file provided by us, no Play Store needed).</p><p>On first launch, enter your venue\'s ID — it stays saved afterwards, your team just has to open the app. The <strong>Connected</strong> indicator at the top of the screen confirms everything works.</p>',
    el:'<p>Η εφαρμογή <strong>GeNext Staff</strong> εγκαθίσταται στο Android τηλέφωνο της ομάδας σας (αρχείο που παρέχουμε εμείς, χωρίς Play Store).</p><p>Κατά την πρώτη εκκίνηση, εισαγάγετε το αναγνωριστικό του καταστήματός σας — παραμένει αποθηκευμένο στη συνέχεια, η ομάδα σας απλώς ανοίγει την εφαρμογή. Η ένδειξη <strong>Connecté</strong> στο πάνω μέρος της οθόνης επιβεβαιώνει ότι όλα λειτουργούν.</p>',
    de:'<p>Die App <strong>GeNext Staff</strong> wird auf dem Android-Handy Ihres Teams installiert (von uns bereitgestellte Datei, kein Play Store nötig).</p><p>Beim ersten Start geben Sie die Kennung Ihres Betriebs ein — sie bleibt danach gespeichert, Ihr Team muss die App nur noch öffnen. Die Anzeige <strong>Connecté</strong> oben im Bildschirm bestätigt, dass alles funktioniert.</p>',
    es:'<p>La aplicación <strong>GeNext Staff</strong> se instala en el teléfono Android de su equipo (archivo proporcionado por nosotros, sin necesidad de Play Store).</p><p>En el primer inicio, introduzca el identificador de su local — queda guardado después, su equipo solo tiene que abrir la aplicación. El indicador <strong>Connecté</strong> en la parte superior confirma que todo funciona.</p>'
  },
  tip:{
    fr:"L'application fonctionne en arrière-plan : gardez le téléphone allumé et connecté au Wi-Fi pour ne manquer aucun appel.",
    en:'The app runs in the background: keep the phone on and connected to Wi-Fi to never miss a call.',
    el:'Η εφαρμογή λειτουργεί στο παρασκήνιο: κρατήστε το τηλέφωνο αναμμένο και συνδεδεμένο στο Wi-Fi για να μη χάνετε καμία κλήση.',
    de:'Die App läuft im Hintergrund: Lassen Sie das Handy eingeschaltet und mit WLAN verbunden, um keinen Ruf zu verpassen.',
    es:'La aplicación funciona en segundo plano: mantenga el teléfono encendido y conectado al Wi-Fi para no perder ninguna llamada.'
  },
  kw:{fr:['installer','serveur','staff','apk'],en:['install','waiter','staff','apk'],el:['εγκατάσταση','σερβιτόρος'],de:['installieren','kellner'],es:['instalar','camarero']}
},

{
  id:'srv-appels-commandes', cat:'serveur', img:'11-server-app-home.webp', tall:true,
  title:{
    fr:'Recevoir un appel de table et une commande',
    en:'Receiving a table call and an order',
    el:'Λήψη κλήσης τραπεζιού και παραγγελίας',
    de:'Tischruf und Bestellung empfangen',
    es:'Recibir una llamada de mesa y un pedido'
  },
  imgAlt:{fr:'Onglet commandes de l\'application Serveur',en:'Orders tab in the waiter app',el:'Καρτέλα παραγγελιών εφαρμογής σερβιτόρου',de:'Bestellungsreiter der Kellner-App',es:'Pestaña de pedidos de la app de camarero'},
  body:{
    fr:"<p>Dès qu'un client appuie sur le bouton d'appel de son menu, l'onglet <strong>Appels</strong> affiche instantanément son numéro de table avec une notification sonore. Une pression suffit pour marquer l'appel comme traité.</p><p>Les commandes passées depuis le menu (formule Commandes & Services) arrivent de la même façon dans l'onglet <strong>Commandes</strong>, avec le détail des plats et quantités — votre équipe les prépare puis les marque comme servies.</p>",
    en:'<p>As soon as a customer taps the call button on their menu, the <strong>Calls</strong> tab instantly shows their table number with a sound notification. One tap is enough to mark the call as handled.</p><p>Orders placed from the menu (Orders & Services plan) arrive the same way in the <strong>Orders</strong> tab, with dish and quantity details — your team prepares them then marks them as served.</p>',
    el:'<p>Μόλις ένας πελάτης πατήσει το κουμπί κλήσης στο μενού του, η καρτέλα <strong>Κλήσεις</strong> εμφανίζει αμέσως τον αριθμό τραπεζιού του με ηχητική ειδοποίηση. Ένα άγγιγμα αρκεί για να σημειωθεί η κλήση ως εξυπηρετημένη.</p><p>Οι παραγγελίες από το μενού (πακέτο Παραγγελίες & Υπηρεσίες) φτάνουν με τον ίδιο τρόπο στην καρτέλα <strong>Παραγγελίες</strong>, με λεπτομέρειες πιάτων και ποσοτήτων — η ομάδα σας τις ετοιμάζει και τις σημειώνει ως σερβιρισμένες.</p>',
    de:'<p>Sobald ein Gast auf die Ruf-Schaltfläche seines Menüs tippt, zeigt der Reiter <strong>Rufe</strong> sofort seine Tischnummer mit Tonbenachrichtigung. Ein Fingertipp genügt, um den Ruf als erledigt zu markieren.</p><p>Bestellungen aus dem Menü (Paket Bestellungen & Service) treffen genauso im Reiter <strong>Bestellungen</strong> ein, mit Details zu Gerichten und Mengen — Ihr Team bereitet sie zu und markiert sie als serviert.</p>',
    es:'<p>En cuanto un cliente pulsa el botón de llamada en su menú, la pestaña <strong>Llamadas</strong> muestra al instante su número de mesa con una notificación sonora. Basta un toque para marcar la llamada como atendida.</p><p>Los pedidos realizados desde el menú (plan Pedidos y Servicios) llegan igual a la pestaña <strong>Pedidos</strong>, con el detalle de platos y cantidades — su equipo los prepara y los marca como servidos.</p>'
  },
  kw:{fr:['appel','commande','notification','table'],en:['call','order','notification','table'],el:['κλήση','παραγγελία'],de:['ruf','bestellung'],es:['llamada','pedido']}
},

{
  id:'srv-astuces', cat:'serveur',
  title:{
    fr:'Astuces pour une équipe sereine',
    en:'Tips for a smooth-running team',
    el:'Συμβουλές για μια ήρεμη ομάδα',
    de:'Tipps für ein entspanntes Team',
    es:'Consejos para un equipo tranquilo'
  },
  body:{
    fr:'<ul><li>Chaque membre de l\'équipe peut installer l\'application sur son propre téléphone — tous reçoivent les mêmes appels en même temps.</li><li>L\'onglet <strong>Messages</strong> permet de recevoir une note écrite de l\'administrateur (ex : rupture de stock du jour).</li><li>Le bouton <strong>Changer de restaurant</strong> dans Réglages déconnecte l\'appareil — utile si un téléphone change d\'établissement.</li><li>Le sélecteur de langue (5 langues) et le mode sombre/clair s\'ajustent en haut de l\'écran, indépendamment pour chaque téléphone.</li></ul>',
    en:'<ul><li>Every team member can install the app on their own phone — everyone receives the same calls at the same time.</li><li>The <strong>Messages</strong> tab lets you receive a written note from the admin (e.g. today\'s out-of-stock items).</li><li>The <strong>Change restaurant</strong> button in Settings disconnects the device — handy if a phone moves to a different venue.</li><li>The language selector (5 languages) and dark/light mode adjust at the top of the screen, independently on each phone.</li></ul>',
    el:'<ul><li>Κάθε μέλος της ομάδας μπορεί να εγκαταστήσει την εφαρμογή στο δικό του τηλέφωνο — όλοι λαμβάνουν τις ίδιες κλήσεις ταυτόχρονα.</li><li>Η καρτέλα <strong>Μηνύματα</strong> επιτρέπει τη λήψη γραπτού σημειώματος από τον διαχειριστή (π.χ. τι εξαντλήθηκε σήμερα).</li><li>Το κουμπί <strong>Αλλαγή εστιατορίου</strong> στις Ρυθμίσεις αποσυνδέει τη συσκευή — χρήσιμο αν ένα τηλέφωνο αλλάζει κατάστημα.</li><li>Ο επιλογέας γλώσσας (5 γλώσσες) και η σκοτεινή/φωτεινή λειτουργία ρυθμίζονται στο πάνω μέρος της οθόνης, ανεξάρτητα για κάθε τηλέφωνο.</li></ul>',
    de:'<ul><li>Jedes Teammitglied kann die App auf dem eigenen Handy installieren — alle erhalten dieselben Rufe gleichzeitig.</li><li>Der Reiter <strong>Nachrichten</strong> ermöglicht den Empfang einer schriftlichen Notiz vom Administrator (z. B. was heute ausverkauft ist).</li><li>Die Schaltfläche <strong>Restaurant wechseln</strong> in den Einstellungen trennt das Gerät — praktisch, wenn ein Handy den Betrieb wechselt.</li><li>Die Sprachauswahl (5 Sprachen) und der Dunkel-/Hell-Modus werden oben im Bildschirm eingestellt, unabhängig für jedes Handy.</li></ul>',
    es:'<ul><li>Cada miembro del equipo puede instalar la aplicación en su propio teléfono — todos reciben las mismas llamadas al mismo tiempo.</li><li>La pestaña <strong>Mensajes</strong> permite recibir una nota escrita del administrador (ej.: lo que se agotó hoy).</li><li>El botón <strong>Cambiar de restaurante</strong> en Ajustes desconecta el dispositivo — útil si un teléfono cambia de local.</li><li>El selector de idioma (5 idiomas) y el modo oscuro/claro se ajustan en la parte superior de la pantalla, de forma independiente en cada teléfono.</li></ul>'
  },
  kw:{fr:['messages','changer de restaurant','équipe'],en:['messages','change restaurant','team'],el:['μηνύματα','ομάδα'],de:['nachrichten','team'],es:['mensajes','equipo']}
},

/* ───────────── MENU CLIENT ───────────── */
{
  id:'menu-decouverte', cat:'menu', img:'12-client-menu-home.webp', tall:true,
  title:{
    fr:'Scanner le QR code et découvrir le menu',
    en:'Scanning the QR code and discovering the menu',
    el:'Σάρωση κωδικού QR και εξερεύνηση του μενού',
    de:'QR-Code scannen und das Menü entdecken',
    es:'Escanear el código QR y descubrir el menú'
  },
  imgAlt:{fr:'Menu client vu sur téléphone',en:'Customer menu on phone',el:'Μενού πελάτη σε τηλέφωνο',de:'Kundenmenü auf dem Handy',es:'Menú del cliente en el teléfono'},
  body:{
    fr:"<p>En scannant le QR code posé sur la table (avec l'appareil photo de son téléphone, sans application à installer), le client accède directement à votre menu.</p><p>Les catégories défilent horizontalement en haut de l'écran pour sauter directement à une rubrique, et chaque plat s'affiche avec sa photo, son prix et une courte description.</p>",
    en:"<p>By scanning the QR code placed on the table (with their phone's camera, no app to install), the customer accesses your menu directly.</p><p>Categories scroll horizontally at the top of the screen to jump straight to a section, and each dish is displayed with its photo, price and a short description.</p>",
    el:'<p>Σαρώνοντας τον κωδικό QR στο τραπέζι (με την κάμερα του τηλεφώνου του, χωρίς εγκατάσταση εφαρμογής), ο πελάτης έχει άμεση πρόσβαση στο μενού σας.</p><p>Οι κατηγορίες κυλούν οριζόντια στο πάνω μέρος της οθόνης για άμεση μετάβαση σε μια ενότητα, και κάθε πιάτο εμφανίζεται με τη φωτογραφία, την τιμή και μια σύντομη περιγραφή του.</p>',
    de:'<p>Durch Scannen des QR-Codes auf dem Tisch (mit der Handykamera, ohne App-Installation) gelangt der Gast direkt zu Ihrem Menü.</p><p>Die Kategorien scrollen oben im Bildschirm horizontal, um direkt zu einem Bereich zu springen, und jedes Gericht wird mit Foto, Preis und kurzer Beschreibung angezeigt.</p>',
    es:'<p>Al escanear el código QR de la mesa (con la cámara de su teléfono, sin instalar ninguna app), el cliente accede directamente a su menú.</p><p>Las categorías se desplazan horizontalmente en la parte superior para saltar directamente a una sección, y cada plato se muestra con su foto, precio y una breve descripción.</p>'
  },
  tip:{
    fr:"Le menu s'adapte automatiquement au thème et à la couleur choisis dans votre administration — aucune action nécessaire de votre part après un changement.",
    en:'The menu automatically adapts to the theme and color chosen in your admin panel — no action needed on your part after a change.',
    el:'Το μενού προσαρμόζεται αυτόματα στο θέμα και το χρώμα που επιλέξατε στη διαχείριση — καμία ενέργεια δεν χρειάζεται από εσάς μετά από μια αλλαγή.',
    de:'Das Menü passt sich automatisch dem in Ihrem Admin-Bereich gewählten Theme und der Farbe an — nach einer Änderung ist Ihrerseits nichts weiter zu tun.',
    es:'El menú se adapta automáticamente al tema y color elegidos en su administración — no se necesita ninguna acción por su parte tras un cambio.'
  },
  kw:{fr:['qr code','scanner','découvrir','catégories'],en:['qr code','scan','discover','categories'],el:['qr','σάρωση'],de:['qr-code','scannen'],es:['código qr','escanear']}
},

{
  id:'menu-recherche', cat:'menu', img:'13-client-menu-search.webp', tall:true,
  title:{
    fr:'Rechercher et filtrer un plat',
    en:'Searching and filtering a dish',
    el:'Αναζήτηση και φιλτράρισμα πιάτου',
    de:'Ein Gericht suchen und filtern',
    es:'Buscar y filtrar un plato'
  },
  imgAlt:{fr:'Recherche dans le menu',en:'Menu search',el:'Αναζήτηση στο μενού',de:'Menüsuche',es:'Búsqueda en el menú'},
  body:{
    fr:"<p>La barre de recherche en haut du menu filtre les plats en temps réel, dès la première lettre tapée — pratique pour un client pressé ou avec une envie précise.</p><p>Les badges colorés sous chaque plat (« Populaire », « Végétarien », allergènes...) aident aussi à filtrer d'un coup d'œil, sans taper de recherche.</p>",
    en:"<p>The search bar at the top of the menu filters dishes in real time, from the very first letter typed — handy for a customer in a hurry or with a specific craving.</p><p>The colored badges under each dish (\"Popular\", \"Vegetarian\", allergens...) also help filter at a glance, without typing a search.</p>",
    el:'<p>Η μπάρα αναζήτησης στο πάνω μέρος του μενού φιλτράρει τα πιάτα σε πραγματικό χρόνο, από το πρώτο γράμμα — χρήσιμο για έναν πελάτη που βιάζεται ή έχει συγκεκριμένη επιθυμία.</p><p>Οι έγχρωμες ετικέτες κάτω από κάθε πιάτο («Δημοφιλές», «Χορτοφαγικό», αλλεργιογόνα...) βοηθούν επίσης στο φιλτράρισμα με μια ματιά, χωρίς αναζήτηση.</p>',
    de:'<p>Die Suchleiste oben im Menü filtert Gerichte in Echtzeit, schon ab dem ersten getippten Buchstaben — praktisch für einen eiligen Gast oder einen konkreten Wunsch.</p><p>Die farbigen Abzeichen unter jedem Gericht („Beliebt", „Vegetarisch", Allergene...) helfen ebenfalls, auf einen Blick zu filtern, ohne zu suchen.</p>',
    es:'<p>La barra de búsqueda en la parte superior del menú filtra los platos en tiempo real, desde la primera letra escrita — práctico para un cliente con prisa o con un antojo concreto.</p><p>Las insignias de colores bajo cada plato («Popular», «Vegetariano», alérgenos...) también ayudan a filtrar de un vistazo, sin escribir ninguna búsqueda.</p>'
  },
  kw:{fr:['recherche','filtrer','badge','allergène'],en:['search','filter','badge','allergen'],el:['αναζήτηση','φίλτρο'],de:['suche','filter'],es:['búsqueda','filtro']}
},

{
  id:'menu-produit', cat:'menu', img:'14-client-menu-product.webp', tall:true,
  title:{
    fr:"La fiche détaillée d'un produit",
    en:'The detailed product page',
    el:'Η αναλυτική καρτέλα ενός προϊόντος',
    de:'Die detaillierte Produktseite',
    es:'La ficha detallada de un producto'
  },
  imgAlt:{fr:'Fiche produit détaillée',en:'Detailed product page',el:'Αναλυτική καρτέλα προϊόντος',de:'Detaillierte Produktseite',es:'Ficha detallada del producto'},
  body:{
    fr:"<p>Toucher un plat ouvre sa fiche complète en plein écran : grande photo, description détaillée, prix, et bouton <strong>Ajouter au panier</strong> (formule Commandes & Services) ou simple consultation (formule Menu QR).</p><p>Les compteurs <strong>+ / −</strong> ajustent la quantité avant l'ajout.</p>",
    en:'<p>Tapping a dish opens its full page in fullscreen: large photo, detailed description, price, and an <strong>Add to cart</strong> button (Orders & Services plan) or simple viewing (Menu QR plan).</p><p>The <strong>+ / −</strong> counters adjust the quantity before adding.</p>',
    el:'<p>Το άγγιγμα ενός πιάτου ανοίγει την πλήρη καρτέλα του σε πλήρη οθόνη: μεγάλη φωτογραφία, αναλυτική περιγραφή, τιμή, και κουμπί <strong>Προσθήκη στο καλάθι</strong> (πακέτο Παραγγελίες & Υπηρεσίες) ή απλή προβολή (πακέτο Menu QR).</p><p>Οι μετρητές <strong>+ / −</strong> προσαρμόζουν την ποσότητα πριν την προσθήκη.</p>',
    de:'<p>Ein Fingertipp auf ein Gericht öffnet dessen vollständige Seite im Vollbild: großes Foto, detaillierte Beschreibung, Preis, und eine Schaltfläche <strong>In den Warenkorb</strong> (Paket Bestellungen & Service) oder nur zur Ansicht (Paket Menu QR).</p><p>Die Zähler <strong>+ / −</strong> passen die Menge vor dem Hinzufügen an.</p>',
    es:'<p>Al tocar un plato se abre su ficha completa a pantalla completa: foto grande, descripción detallada, precio, y botón <strong>Añadir al carrito</strong> (plan Pedidos y Servicios) o simple consulta (plan Menu QR).</p><p>Los contadores <strong>+ / −</strong> ajustan la cantidad antes de añadirlo.</p>'
  },
  kw:{fr:['fiche produit','détail','panier'],en:['product page','detail','cart'],el:['καρτέλα','καλάθι'],de:['produktseite','warenkorb'],es:['ficha','carrito']}
},

{
  id:'menu-commander', cat:'menu', img:'14-client-menu-product.webp', tall:true,
  title:{
    fr:'Commander et appeler le serveur depuis le menu',
    en:'Ordering and calling the waiter from the menu',
    el:'Παραγγελία και κλήση σερβιτόρου από το μενού',
    de:'Bestellen und den Kellner rufen über das Menü',
    es:'Pedir y llamar al camarero desde el menú'
  },
  imgAlt:{fr:'Bouton ajouter au panier',en:'Add to cart button',el:'Κουμπί προσθήκης στο καλάθι',de:'Schaltfläche In den Warenkorb',es:'Botón añadir al carrito'},
  body:{
    fr:"<p>Avec la formule <strong>Commandes & Services</strong>, chaque plat ajouté au panier peut être envoyé directement en cuisine — le client valide sa commande, et votre équipe la reçoit en quelques secondes sur l'application Serveur.</p><p>Un bouton d'appel dédié permet aussi de solliciter un serveur sans passer commande (besoin d'aide, addition, etc.), toujours avec le numéro de table transmis automatiquement.</p>",
    en:"<p>With the <strong>Orders & Services</strong> plan, every dish added to the cart can be sent straight to the kitchen — the customer confirms their order, and your team receives it within seconds on the Waiter App.</p><p>A dedicated call button also lets customers request a waiter without ordering (need help, the bill, etc.), always with the table number sent automatically.</p>",
    el:'<p>Με το πακέτο <strong>Παραγγελίες & Υπηρεσίες</strong>, κάθε πιάτο που προστίθεται στο καλάθι μπορεί να σταλεί απευθείας στην κουζίνα — ο πελάτης επιβεβαιώνει την παραγγελία του, και η ομάδα σας τη λαμβάνει μέσα σε δευτερόλεπτα στην Εφαρμογή Σερβιτόρου.</p><p>Ένα ειδικό κουμπί κλήσης επιτρέπει επίσης να ζητηθεί σερβιτόρος χωρίς παραγγελία (βοήθεια, λογαριασμός κ.λπ.), πάντα με τον αριθμό τραπεζιού να μεταδίδεται αυτόματα.</p>',
    de:'<p>Mit dem Paket <strong>Bestellungen & Service</strong> kann jedes zum Warenkorb hinzugefügte Gericht direkt an die Küche gesendet werden — der Gast bestätigt seine Bestellung, und Ihr Team erhält sie innerhalb von Sekunden auf der Kellner-App.</p><p>Eine eigene Ruf-Schaltfläche ermöglicht es Gästen auch, einen Kellner ohne Bestellung zu rufen (Hilfe, Rechnung usw.), stets mit automatisch übermittelter Tischnummer.</p>',
    es:'<p>Con el plan <strong>Pedidos y Servicios</strong>, cada plato añadido al carrito puede enviarse directamente a la cocina — el cliente confirma su pedido, y su equipo lo recibe en segundos en la aplicación de camarero.</p><p>Un botón de llamada específico también permite solicitar a un camarero sin pedir nada (ayuda, la cuenta, etc.), siempre con el número de mesa transmitido automáticamente.</p>'
  },
  kw:{fr:['commander','appeler','serveur','panier'],en:['order','call','waiter','cart'],el:['παραγγελία','κλήση'],de:['bestellen','rufen'],es:['pedir','llamar']}
},

{
  id:'menu-langues', cat:'menu', img:'12-client-menu-home.webp', tall:true,
  title:{
    fr:'Changer de langue et de thème (côté client)',
    en:'Changing language and theme (customer side)',
    el:'Αλλαγή γλώσσας και θέματος (πλευρά πελάτη)',
    de:'Sprache und Design ändern (Gästeseite)',
    es:'Cambiar de idioma y tema (lado cliente)'
  },
  imgAlt:{fr:'Sélecteur de langue du menu client',en:'Customer menu language selector',el:'Επιλογέας γλώσσας μενού πελάτη',de:'Sprachauswahl im Kundenmenü',es:'Selector de idioma del menú del cliente'},
  body:{
    fr:"<p>Les drapeaux en haut de l'écran changent la langue du menu instantanément, parmi les 5 disponibles — utile pour vos clients internationaux.</p><p>L'icône lune/soleil bascule entre mode sombre et mode clair selon la préférence du client, sans jamais modifier votre configuration d'administration. Si l'option est activée, un bouton palette permet aussi d'essayer un autre thème pour soi-même.</p>",
    en:"<p>The flags at the top of the screen change the menu's language instantly, among the 5 available — useful for your international customers.</p><p>The moon/sun icon switches between dark and light mode according to the customer's preference, without ever changing your admin configuration. If enabled, a palette button also lets them try another theme just for themselves.</p>",
    el:'<p>Οι σημαίες στο πάνω μέρος της οθόνης αλλάζουν αμέσως τη γλώσσα του μενού, από τις 5 διαθέσιμες — χρήσιμο για τους διεθνείς πελάτες σας.</p><p>Το εικονίδιο φεγγάρι/ήλιος εναλλάσσει σκοτεινή και φωτεινή λειτουργία ανάλογα με την προτίμηση του πελάτη, χωρίς ποτέ να αλλάζει τη δική σας διαμόρφωση διαχείρισης. Αν είναι ενεργοποιημένη η επιλογή, ένα κουμπί παλέτας επιτρέπει επίσης να δοκιμάσει άλλο θέμα μόνο για τον εαυτό του.</p>',
    de:'<p>Die Flaggen oben im Bildschirm ändern die Menüsprache sofort, unter den 5 verfügbaren — nützlich für Ihre internationalen Gäste.</p><p>Das Mond-/Sonnen-Symbol wechselt je nach Vorliebe des Gastes zwischen Dunkel- und Hell-Modus, ohne je Ihre Admin-Konfiguration zu ändern. Falls aktiviert, lässt eine Paletten-Schaltfläche den Gast auch ein anderes Theme nur für sich selbst ausprobieren.</p>',
    es:'<p>Las banderas en la parte superior de la pantalla cambian el idioma del menú al instante, entre los 5 disponibles — útil para sus clientes internacionales.</p><p>El icono luna/sol alterna entre modo oscuro y modo claro según la preferencia del cliente, sin modificar nunca su configuración de administración. Si la opción está activada, un botón de paleta también permite probar otro tema solo para uno mismo.</p>'
  },
  kw:{fr:['langue','drapeau','mode sombre','palette'],en:['language','flag','dark mode','palette'],el:['γλώσσα','σημαία'],de:['sprache','flagge'],es:['idioma','bandera']}
},

{
  id:'adm-securite-mdp', cat:'securite',
  title:{
    fr:'Mot de passe administrateur et sécurité de vos accès',
    en:'Administrator password and the security of your access',
    el:'Κωδικός πρόσβασης διαχειριστή και ασφάλεια της πρόσβασής σας',
    de:'Administrator-Passwort und die Sicherheit Ihres Zugangs',
    es:'Contraseña de administrador y la seguridad de su acceso'
  },
  body:{
    fr:"<p>Votre <strong>mot de passe administrateur</strong> n'est jamais stocké en clair : seule son empreinte chiffrée est conservée, et personne — pas même nous — ne peut le lire. À la connexion, votre appareil obtient une <strong>session sécurisée réelle</strong> (la même technologie qu'utilisent les grandes applications) : vous restez connecté sur cet appareil sans avoir à ressaisir votre mot de passe à chaque ouverture, tant que vous ne vous déconnectez pas vous-même.</p><p>Dès que vous <strong>changez votre mot de passe</strong>, toutes les autres sessions déjà ouvertes (sur d'autres appareils) sont immédiatement invalidées : une reconnexion avec le nouveau mot de passe devient obligatoire partout. C'est le réflexe à avoir si vous pensez que quelqu'un d'autre le connaît.</p><p>Une protection automatique bloque aussi temporairement les tentatives après plusieurs mots de passe erronés consécutifs, pour empêcher toute tentative de deviner votre mot de passe par essais répétés.</p>",
    en:'<p>Your <strong>administrator password</strong> is never stored in plain text: only its encrypted fingerprint is kept, and no one — not even us — can read it. When you sign in, your device gets a <strong>real secure session</strong> (the same technology used by major apps): you stay signed in on that device without re-entering your password every time, as long as you don\'t sign out yourself.</p><p>As soon as you <strong>change your password</strong>, every other session already open (on other devices) is immediately invalidated: signing back in with the new password becomes required everywhere. That\'s the reflex to have if you think someone else knows it.</p><p>An automatic protection also temporarily blocks attempts after several wrong passwords in a row, to prevent anyone from guessing your password through repeated tries.</p>',
    el:'<p>Ο <strong>κωδικός πρόσβασης διαχειριστή</strong> σας δεν αποθηκεύεται ποτέ σε απλό κείμενο: διατηρείται μόνο το κρυπτογραφημένο του αποτύπωμα, και κανείς — ούτε καν εμείς — δεν μπορεί να το διαβάσει. Κατά τη σύνδεση, η συσκευή σας αποκτά μια <strong>πραγματική ασφαλή συνεδρία</strong> (την ίδια τεχνολογία που χρησιμοποιούν οι μεγάλες εφαρμογές): παραμένετε συνδεδεμένοι σε αυτή τη συσκευή χωρίς να χρειάζεται να πληκτρολογείτε ξανά τον κωδικό σας κάθε φορά, όσο δεν αποσυνδέεστε οι ίδιοι.</p><p>Μόλις <strong>αλλάξετε τον κωδικό πρόσβασής</strong> σας, όλες οι άλλες ήδη ανοιχτές συνεδρίες (σε άλλες συσκευές) ακυρώνονται αμέσως: η επανασύνδεση με τον νέο κωδικό γίνεται υποχρεωτική παντού. Αυτή είναι η σωστή κίνηση αν πιστεύετε ότι κάποιος άλλος τον γνωρίζει.</p><p>Μια αυτόματη προστασία μπλοκάρει επίσης προσωρινά τις προσπάθειες μετά από αρκετούς λανθασμένους κωδικούς στη σειρά, ώστε να εμποδίζεται κάθε προσπάθεια μαντεψιάς του κωδικού σας.</p>',
    de:'<p>Ihr <strong>Administrator-Passwort</strong> wird niemals im Klartext gespeichert: Nur sein verschlüsselter Fingerabdruck wird aufbewahrt, und niemand — nicht einmal wir — kann es lesen. Bei der Anmeldung erhält Ihr Gerät eine <strong>echte sichere Sitzung</strong> (dieselbe Technologie, die große Apps verwenden): Sie bleiben auf diesem Gerät angemeldet, ohne Ihr Passwort jedes Mal erneut eingeben zu müssen, solange Sie sich nicht selbst abmelden.</p><p>Sobald Sie Ihr <strong>Passwort ändern</strong>, werden alle anderen bereits geöffneten Sitzungen (auf anderen Geräten) sofort ungültig: Eine erneute Anmeldung mit dem neuen Passwort wird überall erforderlich. Das ist der richtige Reflex, wenn Sie vermuten, dass jemand anderes es kennt.</p><p>Ein automatischer Schutz blockiert Versuche außerdem vorübergehend nach mehreren falschen Passwörtern hintereinander, um zu verhindern, dass jemand Ihr Passwort durch wiederholtes Ausprobieren errät.</p>',
    es:'<p>Su <strong>contraseña de administrador</strong> nunca se almacena en texto claro: solo se conserva su huella cifrada, y nadie — ni siquiera nosotros — puede leerla. Al iniciar sesión, su dispositivo obtiene una <strong>sesión segura real</strong> (la misma tecnología que usan las grandes aplicaciones): permanece conectado en ese dispositivo sin tener que volver a introducir su contraseña cada vez, mientras no cierre sesión usted mismo.</p><p>En cuanto <strong>cambia su contraseña</strong>, todas las demás sesiones ya abiertas (en otros dispositivos) se invalidan de inmediato: volver a iniciar sesión con la nueva contraseña pasa a ser obligatorio en todas partes. Es el reflejo que debe tener si cree que alguien más la conoce.</p><p>Una protección automática también bloquea temporalmente los intentos tras varias contraseñas erróneas seguidas, para impedir que alguien intente adivinar su contraseña mediante intentos repetidos.</p>'
  },
  tip:{
    fr:'Astuce : changez votre mot de passe régulièrement, et surtout dès qu\'un membre de l\'équipe qui le connaissait quitte l\'établissement.',
    en:'Tip: change your password regularly, and especially as soon as a team member who knew it leaves the venue.',
    el:'Συμβουλή: αλλάζετε τον κωδικό σας τακτικά, και ιδίως μόλις αποχωρήσει ένα μέλος της ομάδας που τον γνώριζε.',
    de:'Tipp: Ändern Sie Ihr Passwort regelmäßig, besonders sobald ein Teammitglied, das es kannte, den Betrieb verlässt.',
    es:'Consejo: cambie su contraseña regularmente, y sobre todo en cuanto un miembro del equipo que la conocía deje el establecimiento.'
  },
  kw:{fr:['mot de passe','sécurité','session','déconnexion','bruteforce','admin'],en:['password','security','session','logout','bruteforce','admin'],el:['κωδικός','ασφάλεια','συνεδρία'],de:['passwort','sicherheit','sitzung'],es:['contraseña','seguridad','sesión']}
},

{
  id:'adm-securite-pin', cat:'securite',
  title:{
    fr:'Code PIN du personnel : activer et désactiver',
    en:'Staff PIN code: turning it on and off',
    el:'Κωδικός PIN προσωπικού: ενεργοποίηση και απενεργοποίηση',
    de:'Personal-PIN: Aktivieren und Deaktivieren',
    es:'Código PIN del personal: activarlo y desactivarlo'
  },
  body:{
    fr:'<p>Le <strong>code PIN du personnel</strong> (dans Réglages) protège l\'accès à l\'<strong>application Serveur</strong> — bien distinct de votre mot de passe administrateur. Tant qu\'il n\'est pas activé, n\'importe quel appareil connaissant l\'identifiant de votre restaurant peut installer l\'application et l\'utiliser directement, sans code : pratique pour une petite équipe de confiance, mais à activer dès que vous voulez restreindre l\'accès.</p><p>Pour l\'<strong>activer</strong>, basculez l\'interrupteur puis saisissez un code (4 chiffres minimum) et validez avec « Mettre à jour » : ce code sera désormais demandé à chaque nouvel appareil qui installe l\'application Serveur. Pour le <strong>désactiver</strong>, basculez simplement l\'interrupteur en sens inverse et confirmez : l\'application Serveur cesse immédiatement de demander un code pour toute nouvelle connexion.</p><p>Comme pour le mot de passe administrateur, une protection automatique bloque temporairement les tentatives après plusieurs codes erronés consécutifs, et changer ou désactiver le code force les appareils déjà connectés à se reconnecter si nécessaire.</p>',
    en:'<p>The <strong>staff PIN code</strong> (in Settings) protects access to the <strong>Waiter App</strong> — completely separate from your administrator password. Until it\'s turned on, any device that knows your restaurant ID can install the app and use it right away, with no code: convenient for a small trusted team, but worth enabling as soon as you want to restrict access.</p><p>To <strong>turn it on</strong>, flip the switch, then enter a code (at least 4 digits) and confirm with "Update": that code will now be required on every new device that installs the Waiter App. To <strong>turn it off</strong>, simply flip the switch back and confirm: the Waiter App immediately stops asking for a code on any new connection.</p><p>Just like the administrator password, an automatic protection temporarily blocks attempts after several wrong codes in a row, and changing or disabling the code forces already-connected devices to reconnect if needed.</p>',
    el:'<p>Ο <strong>κωδικός PIN προσωπικού</strong> (στις Ρυθμίσεις) προστατεύει την πρόσβαση στην <strong>Εφαρμογή Σερβιτόρου</strong> — εντελώς ξεχωριστός από τον κωδικό πρόσβασης διαχειριστή. Όσο δεν είναι ενεργοποιημένος, οποιαδήποτε συσκευή που γνωρίζει το αναγνωριστικό του εστιατορίου σας μπορεί να εγκαταστήσει την εφαρμογή και να τη χρησιμοποιήσει αμέσως, χωρίς κωδικό: βολικό για μια μικρή ομάδα εμπιστοσύνης, αλλά αξίζει να τον ενεργοποιήσετε μόλις θελήσετε να περιορίσετε την πρόσβαση.</p><p>Για να τον <strong>ενεργοποιήσετε</strong>, μετακινήστε τον διακόπτη, πληκτρολογήστε έναν κωδικό (τουλάχιστον 4 ψηφία) και επιβεβαιώστε με «Ενημέρωση»: αυτός ο κωδικός θα ζητείται πλέον σε κάθε νέα συσκευή που εγκαθιστά την Εφαρμογή Σερβιτόρου. Για να τον <strong>απενεργοποιήσετε</strong>, απλώς μετακινήστε τον διακόπτη πίσω και επιβεβαιώστε: η Εφαρμογή Σερβιτόρου σταματά αμέσως να ζητά κωδικό για κάθε νέα σύνδεση.</p><p>Όπως και με τον κωδικό πρόσβασης διαχειριστή, μια αυτόματη προστασία μπλοκάρει προσωρινά τις προσπάθειες μετά από αρκετούς λανθασμένους κωδικούς στη σειρά, και η αλλαγή ή απενεργοποίηση του κωδικού αναγκάζει τις ήδη συνδεδεμένες συσκευές να επανασυνδεθούν αν χρειαστεί.</p>',
    de:'<p>Der <strong>Personal-PIN-Code</strong> (in den Einstellungen) schützt den Zugang zur <strong>Kellner-App</strong> — völlig getrennt von Ihrem Administrator-Passwort. Solange er nicht aktiviert ist, kann jedes Gerät, das Ihre Restaurant-ID kennt, die App installieren und sofort ohne Code nutzen: praktisch für ein kleines, vertrauenswürdiges Team, aber sinnvoll zu aktivieren, sobald Sie den Zugang einschränken möchten.</p><p>Zum <strong>Aktivieren</strong> schalten Sie den Schalter um, geben einen Code ein (mindestens 4 Ziffern) und bestätigen mit „Aktualisieren": Dieser Code wird nun bei jedem neuen Gerät verlangt, das die Kellner-App installiert. Zum <strong>Deaktivieren</strong> schalten Sie den Schalter einfach zurück und bestätigen: Die Kellner-App fragt bei jeder neuen Verbindung sofort keinen Code mehr ab.</p><p>Wie beim Administrator-Passwort blockiert ein automatischer Schutz Versuche vorübergehend nach mehreren falschen Codes hintereinander, und das Ändern oder Deaktivieren des Codes zwingt bereits verbundene Geräte bei Bedarf zur erneuten Anmeldung.</p>',
    es:'<p>El <strong>código PIN del personal</strong> (en Ajustes) protege el acceso a la <strong>aplicación de camarero</strong> — totalmente independiente de su contraseña de administrador. Mientras no esté activado, cualquier dispositivo que conozca el identificador de su restaurante puede instalar la aplicación y usarla de inmediato, sin código: cómodo para un equipo pequeño de confianza, pero conviene activarlo en cuanto quiera restringir el acceso.</p><p>Para <strong>activarlo</strong>, mueva el interruptor, introduzca un código (mínimo 4 dígitos) y confirme con «Actualizar»: ese código se pedirá a partir de ahora en cada nuevo dispositivo que instale la aplicación de camarero. Para <strong>desactivarlo</strong>, simplemente vuelva a mover el interruptor y confirme: la aplicación de camarero deja de pedir un código de inmediato para cualquier nueva conexión.</p><p>Al igual que con la contraseña de administrador, una protección automática bloquea temporalmente los intentos tras varios códigos erróneos seguidos, y cambiar o desactivar el código obliga a los dispositivos ya conectados a reconectarse si es necesario.</p>'
  },
  tip:{
    fr:'Astuce : si un appareil du personnel est perdu ou volé, changez immédiatement le code PIN — l\'ancien appareil ne pourra plus s\'en resservir.',
    en:'Tip: if a staff device is lost or stolen, change the PIN code right away — the old device won\'t be able to use it anymore.',
    el:'Συμβουλή: αν μια συσκευή προσωπικού χαθεί ή κλαπεί, αλλάξτε αμέσως τον κωδικό PIN — η παλιά συσκευή δεν θα μπορεί πλέον να τον χρησιμοποιήσει.',
    de:'Tipp: Wenn ein Personal-Gerät verloren geht oder gestohlen wird, ändern Sie sofort den PIN-Code — das alte Gerät kann ihn dann nicht mehr verwenden.',
    es:'Consejo: si se pierde o roba un dispositivo del personal, cambie de inmediato el código PIN — el dispositivo antiguo ya no podrá usarlo.'
  },
  kw:{fr:['pin','code','personnel','serveur','sécurité','activer','désactiver'],en:['pin','code','staff','waiter','security','enable','disable'],el:['pin','κωδικός','προσωπικό','ασφάλεια'],de:['pin','code','personal','sicherheit'],es:['pin','código','personal','seguridad']}
}

];
