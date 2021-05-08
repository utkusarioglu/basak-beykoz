<?php
  $TEMPLATE_PATH = parse_url(get_template_directory_uri(), PHP_URL_PATH);
  $PAGE_TITLE = get_bloginfo('name');
  $PAGE_TAGLINE = get_bloginfo('description');
  $TITLE_SEPARATOR = '-';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
  <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
    />
  <meta name="theme-color" content="#505050" />
  <meta name="description" content="Profesyonel koc Basak Beykoz'un internet sitesi" />
  <link rel="apple-touch-icon" href="<?php echo $TEMPLATE_PATH; ?>/logo192.png" />
  <link rel="manifest" href="<?php echo $TEMPLATE_PATH; ?>/manifest.json" />
  <title><?php echo $PAGE_TITLE . " " . $TITLE_SEPARATOR .  " " . $PAGE_TAGLINE ?></title>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="theme-color" content="#ffffff">
  <link href="https://unpkg.com/sanitize.css" rel="stylesheet" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito&family=Raleway:wght@500&display=swap');

    :root {
      --brush-white: rgb(251, 251, 251);
      --brush-lightGray: rgb(237, 243, 243);
      --brush-gray: rgb(133, 159, 164);
      --brush-black: rgb(52, 65, 75);
      --brush-black-transparent: rgba(52, 65, 75, 0.5);
      --brush-lightBlue: rgb(173, 203, 221);
      --brush-darkBlue: rgb(50, 67, 88);
      --brush-lightYellow: rgb(255, 238, 198);
      --brush-darkYellow: rgb(255, 192, 91);
      --brush-lightGreen: rgb(198, 223, 215);
      --brush-darkGreen: rgb(12, 80, 58);

      /**
      Controls the height of the mobile menu and the shim under the footer
      where the menu lodges if the user scrolls all the way down.
       */
      --height-menu: 50px;
      /**
      Controls the height of the desktop menu and its components
       */
      --height-desktop-menu: 60px;
      /**
      Controls the height of mobile footer
       */
      --height-footer: 150px;
      /**
      Controls the height of the ladies in the footer. 
      This value is also used for the footer reserved space; Pushing the 
      footer below the unscrolled viewport, making the appearance of
      the ladies a surprise to unsuspecting eyes.
       */
      --height-desktop-footer: 200px;
      /** 
      Controls the height of the footer elements other than the sitting
      ladies. Meaning, it sets the height of the square button and the 
      wavy background color. 
      */
      --height-desktop-footer-button: 150px;
      --spacing: 8px;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Raleway', sans-serif;
    }

    p, a, span, div, button {
      font-family: 'Nunito', sans-serif;
      color: var(--brush-darkBlue);
      text-decoration: none;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: var(--brush-white);
    }

    html {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none; 
      -ms-user-select: none;
      user-select: none; 
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

    body {
      /* position: fixed; */
      width: 100%;
      height: 100%;
    }

    #root {
      position: fixed;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      overflow-x: hidden;
    }

    .singular-view a {
      color: #005f35;
    }

    .singular-view a:hover {
      text-decoration: underline;
      text-decoration-thickness: 4px;
      text-decoration-color: rgb(0 95 53 / 63%);
    }

    .cat-loading-container {
      position: fixed;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .cat-loading > * {
      text-align: center;
      margin: 0 auto;
    }

    .cat-loading span {
      font-size: 40px;
    }

    .min-height-100-p {
      min-height: 100%;
      overflow-x: hidden;
    }

    figure {
      padding: 0;
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
    }
  </style>
  <script>
    window.config = {
      pageTitle: '<?php echo $PAGE_TITLE ?>',
      pageTagline: '<?php echo $PAGE_TAGLINE ?>',
      titleSeparator: '<?php echo $TITLE_SEPARATOR ?>',
    }
  </script>
</head>
  <body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root">
    <div class="cat-loading-container">
      <div class="cat-loading">
        <div>
          <span role="img" aria-label="cat">
            😺
          </span>
        </div>
        <h4>Kedi sayfayı yüklüyor...</h4>
      </div>
    </div>
  </div>
  </body>
</html>
