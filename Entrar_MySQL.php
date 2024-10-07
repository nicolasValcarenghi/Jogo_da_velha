<?php
$content = file_get_contents("C:\\xampp\\phpMyAdmin\\config.inc.php");
if ($content !== false) {
  $content = str_replace('$cfg[\'Servers\'][$i][\'AllowNoPassword\'] = false', '$cfg[\'Servers\'][$i][\'AllowNoPassword\'] = true', $content);
  file_put_contents("C:\\xampp\\phpMyAdmin\\config.inc.php", $content);
  echo 'phpMyAdmin liberado: <a href="http://localhost/phpmyadmin/">Acessar phpMyAdmin</a>';
} else {
  echo "Não foi possível ler o arquivo config.inc.php";
}