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
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito&family=Raleway:wght@500&display=swap');

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Raleway', sans-serif;
    }

    p, a, span, div {
      font-family: 'Nunito', sans-serif;
      color: black;
      text-decoration: none;
    }

    body {
      margin: 0;
      padding; 0;

    }
    html,
    body,
    #root {
      height: 100%;
    }

    .singular-view a {
      color: #005f35;
    }

    .singular-view a:hover {
      text-decoration: underline;
      text-decoration-thickness: 4px;
      text-decoration-color: rgb(0 95 53 / 63%);
    }

    .cat-loading {
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
    <div class="cat-loading">
      <div>
        <span role="img" aria-label="cat">
          😺
        </span>
      </div>
      <h4>Kedi sayfayı yüklüyor...</h4>
    </div>
  </div>
  </body>
</html>
