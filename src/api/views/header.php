<?php
require 'models/base_model.php';
$menu = (new Base_Model)->menu();
$submenu = (new Base_Model)->submenu();
$d = (new Base_Model)->configuration()[0];
$this->description = $d['description'];
$this->keywords = $d['keyword'];
$this->meta = $d['meta'];
$this->logo = $d['logo'];
$this->favicon = $d['favicon'];
$color = json_decode($d['color']);
$large_img = $d['large_img'];
$small_img = $d['small_img'];

// (new Buffer)->start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="icon" href="./favicon.ico"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes"/>
    <meta name="theme-color" content="#000000"/>
    <meta name="description" content="<?= $this->description ?>"/>
    <meta name="keywords" content="<?= $this->keywords ?>"/>
  <?= $this->meta ?>
    <link rel="apple-touch-icon" href="./build/images/logo192.png"/>
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="./manifest.json"/>
    <title><?= SITE_NAME ?> | <?= isset($this->title) ? $this->title : null; ?></title>
    <link rel="alternate" hreflang="en" href="http://de.example.com/page.html"/>
    <link rel="alternate" hreflang="x-default" href="<?= URL ?>"/>
    <!-- iOS -->
    <link rel="apple-touch-icon" href="./img/icons/icon-144x144.png"/>
    <meta name="mobile-web-app-capable" content="yes"/>
    <meta name="mobile-web-app-status-bar-style" content="black"/>
    <meta name="mobile-web-app-title" content="<?= SITE_NAME ?>"/>
    <link rel="stylesheet" type="text/css" href="<?= URL ?>build/index.min.css">
    <link
            rel="stylesheet"
            href="<?= URL ?>build/animate.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
    <script src="https://unpkg.com/tilt.js@1.2.1/dest/tilt.jquery.min.js"></script>
    <script type="module" src="<?= URL ?>build/app.bundle.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/wowjs@1.1.3/dist/wow.min.js"
            integrity="sha256-gHiUEskgBO+3ccSDRM+c5+nEwTGp64R99KYPfITpnuo=" crossorigin="anonymous"></script>
    <script>
        wow = new WOW()
        wow.init();
    </script>
</head>
<?php flush(); ?>
<body dir="ltr">
<noscript>You need to enable JavaScript to run this app.</noscript>

<div id="root">

    <header>
        <div class="header__frame h-100 relative">
            <div class="d-flex flex-row-reverse justify-content-between align-items-center h-100">
                <div class="nav-btn ms-hiddenMdUp">
                    <i class="ms-Icon ms-Icon--GlobalNavButton text-white ms-fontSize-32" aria-hidden="true"></i>
                </div>

                <div class="d-flex flex-row-reverse justify-content-between align-items-center">
                    <nav class="ms-hiddenSm">
                        <ul class="d-flex flex-row align-items-center justify-content-between">
                          <?php
                          foreach ($menu as $key => $val) {
                            if ($val['total'] > 0): // Is there the submenu?
                              ?>
                                <li class="sub" data-subNavId="<?= $key ?>">
                                    <a href="javascript:void(0)" data-magic-cursor="visible">
                                        <span><?= $val['name'] ?></span>
                                        <i class="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i>
                                    </a>

                                    <div class="dropdown-menu"
                                         id="subNav<?= $key ?>">
                                        <div class="ms-Grid-row">
                                          <?php
                                          foreach ($submenu as $key => $v):
                                            if ($v['menu_id'] == $val['menu_id']):
                                              ?>
                                                <div class="ms-Grid-col ms-sm12 ms-md12 ms-lg2 text-center">
                                                    <a href="<?= $v['link'] ?>" data-magic-cursor="visible">

                                                        <span><?= $v['name'] ?></span>
                                                    </a>
                                                </div>
                                            <?php
                                            endif;
                                          endforeach;
                                          ?>
                                        </div>
                                    </div>
                                </li>
                            <?php
                            else:
                              ?>
                                <li>
                                    <a class="nav-link" href="<?= $val['link'] ?>" data-magic-cursor="visible">
                                        <span><?= $val['name'] ?></span>
                                    </a>
                                </li>
                            <?php
                            endif;
                          }
                          ?>
                        </ul>
                    </nav>
                </div>

                <a href="<?= URL ?>">
                    <figure draggable="false" class="wow fadeIn">
                        <img src="<?= URL ?>build/images/<?= $this->logo ?>" alt="<?= SITE_NAME ?>"
                             style="width:auto;">
                    </figure>
                </a>
            </div>

            <ul id="miniNav" class="d-flex flex-row align-items-center justify-content-start d-none">
              <?php
              foreach ($menu as $key => $val) {
                if ($val['total'] > 0): // Is there the submenu?
                  ?>
                    <li class="sub">
                        <a href="javascript:void(0)" data-magic-cursor="visible">
                          <?= $val['name'] ?>
                            <i class="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i>
                        </a>

                        <ul class="subnav animated">
                          <?php
                          foreach ($submenu as $key => $v):
                            if ($v['menu_id'] == $val['menu_id']):
                              ?>
                                <li><a href="<?= $v['link'] ?>"
                                       data-magic-cursor="visible"><?= $v['name'] ?></a></li>
                            <?php
                            endif;
                          endforeach;
                          ?>
                        </ul>
                    </li>
                <?php
                else:
                  ?>
                    <li>
                        <a href="<?= $val['link'] ?>"
                           data-magic-cursor="visible"><?= $val['name'] ?></a>
                    </li>
                <?php
                endif;
              }
              ?>
                <li>
                    <button type="button" id="switchTheme" class="btn-dark" title="Toggle dark/light mode">
                        <div class="holder">
                                    <span>
                                  <svg aria-hidden="true" width="14" height="13" viewBox="0 0 14 13"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M4.52208 7.71754C7.5782 7.71754 10.0557 5.24006 10.0557 2.18394C10.0557 1.93498 10.0392 1.68986 10.0074 1.44961C9.95801 1.07727 10.3495 0.771159 10.6474 0.99992C12.1153 2.12716 13.0615 3.89999 13.0615 5.89383C13.0615 9.29958 10.3006 12.0605 6.89485 12.0605C3.95334 12.0605 1.49286 10.001 0.876728 7.24527C0.794841 6.87902 1.23668 6.65289 1.55321 6.85451C2.41106 7.40095 3.4296 7.71754 4.52208 7.71754Z"></path>
                                  </svg>
                                    </span>
                        </div>
                    </button>
                </li>
            </ul>
        </div>
    </header>


  <?php
  if (isset($this->sitemap) && $this->sitemap == true) {
    echo '<h2 class="page-title"><span class="d-block ms-motion-duration-1 ms-motion-slideUpIn">' . $this->title . '</span></h2>';
  }
  ?>
    <div class="overlay"></div>
    <div id="preloader"><span></span></div>
