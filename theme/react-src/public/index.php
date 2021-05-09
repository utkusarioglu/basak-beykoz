<?php
  $TEMPLATE_PATH = parse_url(get_template_directory_uri(), PHP_URL_PATH);
  $PAGE_TITLE = get_bloginfo('name');
  $PAGE_TAGLINE = get_bloginfo('description');
  $TITLE_SEPARATOR = '-';
?>
<!DOCTYPE html>
<html lang="tr">
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
    <div class="loader-html__container">
      <div class="loader-html">
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
