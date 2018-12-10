<?php
/**
 * The page template file
 *
 * @package WordPress
 * @subpackage arena CUSTOM ORDER
 * @since 1.0
 * @version 1.0
 */


// get_header(); 

// if(have_posts()): 
//   while(have_posts()): the_post(); 
//     the_content();
//   endwhile;
// else:
//   get_template_part('template/', 'none');
// endif;

// get_footer();

$markA = ( isset($_GET['markA']) )? esc_attr($_GET['markA']) : null;

$markA_sjis = urlencode(mb_convert_encoding( $markA, "SJIS-win", "UTF-8") );

?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="/favicon.ico">

    <title>Sample</title>

    <!-- Bootstrap core CSS -->
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="//getbootstrap.com/docs/4.0/examples/sign-in/signin.css" rel="stylesheet">
    <style>
      svg {
        height: 70vh;
      }
    </style>
  </head>

  <body class="text-center">
    <div class="container">
      <h1 class="h3 mb-3 font-weight-normal">Sample</h1>
      <!-- <img class="mb-4" src="//custom.arena-jp.com/simulation/printcustom2/wp-content/uploads/sites/3/OAR-8330-Sample.svg" alt="" style="height: 70vh;"> -->
      
      <div class="mb-4">
        <?php
          $basic_auth = array('user' => 'ccv', 'pass' => 'shunlock');
          $url = 'https://custom.arena-jp.com/simulation/printcustom2/wp-content/uploads/sites/3/OAR-8330-Sample.svg';
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($ch, CURLOPT_USERPWD, $basic_auth['user'] . ":" . $basic_auth['pass']);
          curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
          $result = curl_exec($ch);
          $result = str_replace("&amp;mark=", "&amp;mark=" . $markA_sjis, $result);
          curl_close($ch);
          echo $result;
        ?>
      </div>

      <div></div>

      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>

    </div>
  </body>
</html>
