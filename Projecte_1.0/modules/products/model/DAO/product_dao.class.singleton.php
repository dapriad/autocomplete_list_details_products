<?php
class productDAO {

    static $_instance;

    private function __construct() {
        
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function create_product_DAO($db, $arrArgument) {
        $id_prod = $arrArgument['id_prod'];
        $prod_name = $arrArgument['prod_name'];
        $price = $arrArgument['price'];
        $dis_date = $arrArgument['dis_date'];
        $exp_date = $arrArgument['exp_date'];
        $status = $arrArgument['status'];
        $avatar = $arrArgument['avatar'];
        $country = $arrArgument['country'];
        $province = $arrArgument['province'];
        $population = $arrArgument['population'];

        $sql = "INSERT INTO products (id_prod, prod_name, price, dis_date,"
                . " exp_date, status, avatar, country, province, population"
                . " ) VALUES ('$id_prod', '$prod_name', '$price',"
                . " '$dis_date', '$exp_date', '$status', '$avatar', '$country', '$province', '$population')";

        return $db->ejecutar($sql);
    }
    
    public function obtain_paises_DAO($url) {
        
        $ch = curl_init();
        curl_setopt ($ch, CURLOPT_URL, $url);
        curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        $file_contents = curl_exec($ch);
        curl_close($ch);
            
        return ($file_contents) ? $file_contents : FALSE;
    }
        
    public function obtain_provincias_DAO() {
        $json = array();
	    $tmp = array();
        $provincias = simplexml_load_file($_SERVER['DOCUMENT_ROOT'] . "/Projecte_1.0/resources/provinciasypoblaciones.xml");
        $result = $provincias->xpath("/lista/provincia/nombre | /lista/provincia/@id");
            for ($i=0; $i<count($result); $i+=2) {
                $e=$i+1;
                $provincia=$result[$e];
                $tmp = array(
                    'id' => (string) $result[$i], 'nombre' => (string) $provincia	
                );
                array_push($json, $tmp);
            }
        return $json;   
    }
        
    public function obtain_poblaciones_DAO($arrArgument) {
        $json = array();
        $tmp = array();
            
        $filter = (string)$arrArgument;
        $xml = simplexml_load_file($_SERVER['DOCUMENT_ROOT'] . "/Projecte_1.0/resources/provinciasypoblaciones.xml");
        $result = $xml->xpath("/lista/provincia[@id='$filter']/localidades");
    
        	for ($i=0; $i<count($result[0]); $i++) {
            	$tmp = array(
                    'poblacion' => (string) $result[0]->localidad[$i]	
                );
                array_push($json, $tmp);
            }
            
        return $json;
        }
        
    
}
