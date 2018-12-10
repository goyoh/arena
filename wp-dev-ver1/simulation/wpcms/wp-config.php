<?php
/**
 * WordPress の基本設定
 *
 * このファイルは、インストール時に wp-config.php 作成ウィザードが利用します。
 * ウィザードを介さずにこのファイルを "wp-config.php" という名前でコピーして
 * 直接編集して値を入力してもかまいません。
 *
 * このファイルは、以下の設定を含みます。
 *
 * * MySQL 設定
 * * 秘密鍵
 * * データベーステーブル接頭辞
 * * ABSPATH
 *
 * @link http://wpdocs.sourceforge.jp/wp-config.php_%E3%81%AE%E7%B7%A8%E9%9B%86
 *
 * @package WordPress
 */

// 注意: 
// Windows の "メモ帳" でこのファイルを編集しないでください !
// 問題なく使えるテキストエディタ
// (http://wpdocs.sourceforge.jp/Codex:%E8%AB%87%E8%A9%B1%E5%AE%A4 参照)
// を使用し、必ず UTF-8 の BOM なし (UTF-8N) で保存してください。

// ** MySQL 設定 - この情報はホスティング先から入手してください。 ** //
/** WordPress のためのデータベース名 */
define('DB_NAME', 'arena_wp_simulation');

/** MySQL データベースのユーザー名 */
define('DB_USER', 'arena');

/** MySQL データベースのパスワード */
define('DB_PASSWORD', 'o9j6GVZQ');

/** MySQL のホスト名 */
define('DB_HOST', 'localhost');

/** データベースのテーブルを作成する際のデータベースの文字セット */
define('DB_CHARSET', 'utf8mb4');

/** データベースの照合順序 (ほとんどの場合変更する必要はありません) */
define('DB_COLLATE', '');

/**#@+
 * 認証用ユニークキー
 *
 * それぞれを異なるユニーク (一意) な文字列に変更してください。
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org の秘密鍵サービス} で自動生成することもできます。
 * 後でいつでも変更して、既存のすべての cookie を無効にできます。これにより、すべてのユーザーを強制的に再ログインさせることになります。
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '|=Ivo|IE*nvQsIk.;u>{>M _0-i[K oZ>P}j;}XOBru;92yQoi*1hH!REP(?D3&j');
define('SECURE_AUTH_KEY',  '4mx}il]8ME0A(l]8v_qM8d]{G=%_r)v<X<kI)Bl93`P:dd8mWKczwW &{.([(wyn');
define('LOGGED_IN_KEY',    '}$GNjp( YXE[gk33[IQb,P:?dE/k*d;IkqZq/BY#6Tl4~F j$^v@06f=>-R(i1,T');
define('NONCE_KEY',        '5F<X{;f[YO`CgD.o0yjnYBg$GK@~>dmm7m[WupGW!G> GN,DKO4LkHg!W]-W5u9B');
define('AUTH_SALT',        'l=$7J=*g.:]Vf(bf++soIrijD5:V&{dw+D7yD0)K`.PJI^Hrdg6fmdy-&={>bP}B');
define('SECURE_AUTH_SALT', 'Lcic}bx{<LvNO2sDI]Rxb<MIywU}s6-ExX0Oi-ojcNvZhVja*HC,n4:}mcL!ic;z');
define('LOGGED_IN_SALT',   'B.&H#aWF1I~WD%S7MpEv[M!wW-TxO$T@RcKgek7D( |Hb}KbY,g?3{6-4*]+;X|m');
define('NONCE_SALT',       ':Z#UB7elQa*wqkf90|<pbs#P;e}umEd;2lzc)8.yWs7}!6WxZmulbbLvS5tO_&{^');

/**#@-*/

/**
 * WordPress データベーステーブルの接頭辞
 *
 * それぞれにユニーク (一意) な接頭辞を与えることで一つのデータベースに複数の WordPress を
 * インストールすることができます。半角英数字と下線のみを使用してください。
 */
$table_prefix  = 'wp_';

/**
 * 開発者へ: WordPress デバッグモード
 *
 * この値を true にすると、開発中に注意 (notice) を表示します。
 * テーマおよびプラグインの開発者には、その開発環境においてこの WP_DEBUG を使用することを強く推奨します。
 *
 * その他のデバッグに利用できる定数については Codex をご覧ください。
 *
 * @link http://wpdocs.osdn.jp/WordPress%E3%81%A7%E3%81%AE%E3%83%87%E3%83%90%E3%83%83%E3%82%B0
 */

// DEBUG
define('WP_DEBUG', false);

// MULTISITE
define('WP_ALLOW_MULTISITE', true);
define('MULTISITE', true);
define('SUBDOMAIN_INSTALL', false);
// define('DOMAIN_CURRENT_SITE', 'custom.arena-jp.com');
define('DOMAIN_CURRENT_SITE', 'localhost');
define('PATH_CURRENT_SITE', '/simulation/');
define('SITE_ID_CURRENT_SITE', 1);
define('BLOG_ID_CURRENT_SITE', 1);


define('FORCE_SSL_LOGIN', true);
define('FORCE_SSL_ADMIN', true);
$_SERVER['HTTPS'] = 'on';
/*
$_SERVER['HTTP_HOST'] = $_SERVER['HTTP_X_FORWARDED_HOST'];
$_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_X_FORWARDED_FOR'];
define('FORCE_SSL_LOGIN', true);
define('FORCE_SSL_ADMIN', true);
//if ( ! empty( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https' ) {
	$_SERVER['HTTPS'] = 'on';
//}
define('WP_SITEURL', 'https://custom.arena-jp.com/simulation');
define('WP_HOME', 'https://custom.arena-jp.com/simulation');
*/

/* 編集が必要なのはここまでです ! WordPress でブログをお楽しみください。 */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
