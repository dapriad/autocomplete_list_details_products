<?php
    function loadModel($model_path, $model_name, $function, $arrArgument = '') {
        $model = $model_path . $model_name . '.class.singleton.php';
        
        if (file_exists($model)) {
            include_once($model);
            
            $modelClass = $model_name;
            
            if (!method_exists($modelClass, $function)){
                // die($function . ' function not found in Model ' . $model_name);
                throw new Exception();
            }
            
            $obj = $modelClass::getInstance();
 
            if (isset($arrArgument)) {
                return $obj->$function($arrArgument);
            }
        } else {
            throw new Exception();
            // die($model_name . ' Model Not Found under Model Folder');
        }
    }
    
    function loadView($rutaVista = "", $templateName = "", $arrPassValue = '') {
    $view_path = $rutaVista . $templateName;
    $arrData = '';

    if (file_exists($view_path)) {
        if (isset($arrPassValue))
            $arrData = $arrPassValue;
        include_once($view_path);
    } else {
        
        $result = filter_num_int($rutaVista);
        if ($result['resultado']) {
            $rutaVista = $result['datos'];
        } else {
            $rutaVista = http_response_code();
        }
        
        $log = Log::getInstance();
        $log->add_log_general("error loadView general", $_GET['module'], "response " . $rutaVista); //$text, $controller, $function
        $log->add_log_user("error loadView general", "", $_GET['module'], "response " . $rutaVista); //$msg, $username = "", $controller, $function

        $result = response_code($rutaVista);
        $arrData = $result;
        require_once 'view/includes/error.php';
        //exit();
    }
}