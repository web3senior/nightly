<?php

//header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
//header("Access-Control-Max-Age: 3600");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: https://ardabilman.ir");
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

class V1 extends Controller
{
    private $_error = null;
    private $secretKey = 'secretd';
    private $version = 'V1';

    function __construct()
    {
        parent::__construct();


        //echo password_hash('102030', PASSWORD_DEFAULT);
    }



    protected function authorization()
    {
        if (!preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
            header('HTTP/1.0 400 Bad Request');
            echo 'Token not found in request';
            exit;
        } else {
            // Verify user
            $token = substr($_SERVER['HTTP_AUTHORIZATION'], strlen("Bearer "), strlen($_SERVER['HTTP_AUTHORIZATION']));
            $result = (new JWTAuth)->decode($token);



            if (!$result['result']) {
                $this->_error = 'Token is not valid!';
                $this->_showError();
                exit();
            }
            //    else {
            //     print_r($result['response']);
            //     exit();
            //    }
        }
    } // $token = $this->authorization();
    
    function index()
    {
    }

    function tour()
    {
        $table = ['tour', 'id'];
        $this->request_method('GET');
        $data = $this->model->command('fetch', $table);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function event()
    {
        $table = ['event', 'id'];
        $this->request_method('GET');
        $data = $this->model->command('fetch', $table);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }
    
    function project()
    {
        $table = ['project', 'id'];
        $this->request_method('GET');
        $data = $this->model->command('fetch', $table);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function category()
    {
        $table = ['category', 'id'];
        $this->request_method('GET');
        $data = $this->model->command('fetch', $table);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function up($wallet_addr)
    {
        try {
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://4201.rpc.thirdweb.com',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => '{"jsonrpc": "2.0","method": "eth_call","params": [{"to": "' . $wallet_addr . '","data": "0x54f6127f5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5"},"latest"],"id": 0}',
                CURLOPT_HTTPHEADER => array(
                    'Content-Type: application/json'
                ),
            ));

            $response = curl_exec($curl);
            curl_close($curl);

            $result = json_decode($response)->result;
            $url =  substr($result, 210, strlen($result));

            // Are hexadecimal digits?
            if (ctype_xdigit($url)) {
                $cid = hex2bin($url);

                // echo str_replace(['ipfs://', '://', '//'], '', $cid);die;

                $ipfs = $this->getIPFS('https://api.universalprofile.cloud/ipfs/' . str_replace(['ipfs://', '://', '//'], '', $cid));
                return json_decode($ipfs);
            }

            return "Not Found";
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    function getIPFS($url)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => trim($url),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HEADER  => false,
        ));

        $response = curl_exec($curl);
        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);

        if ($httpcode === 200) return $response;
        else return '{
        "LSP3Profile": {
          "name": "Undefined",
          "description": "Undefined",
          "links": [],
          "tags": ["Universal Link"],
          "profileImage": [
            {
              "width": 288,
              "height": 320,
              "verification": {
                "method": "keccak256(bytes)",
                "data": "0x61017bc4388775dac674ff82188589934da6cbdc79aacf3dd1d90d2af0597c8e"
              },
              "url": ""
            }
          ],
          "backgroundImage": []
        }
      }
      ';
    }

    function point()
    {
        $entityBody = file_get_contents('php://input');
        $table = ['point', 'id'];
        $this->request_method('GET');
        $data = $this->model->point($table);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            foreach ($data as $key => $value) {
                $data[$key]['profile'] = $this->up($value['wallet_address']);
            }
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function tap($id)
    {
        $entityBody = file_get_contents('php://input');
        $data = (array) json_decode($entityBody);
        $table = ['point', 'id'];
        $this->request_method('POST');


        $data = $this->model->command('update',    $table, $data, $id);
        if (($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function dateTime($timestamp)
    {
        $timestamp = strtotime($timestamp);
        $this->request_method("GET");
        echo json_encode([
            'year' => jdate('Y', $timestamp),
            'month_name' => jdate('F', $timestamp),
            'day' => jdate('j', $timestamp),
            'day_name' => jdate('l', $timestamp),
        ]);
    }

    function now()
    {
        $timestamp = time();
        $this->request_method("GET");
        echo json_encode([
            'year' => jdate('Y', $timestamp),
            'month_name' => jdate('F', $timestamp),
            'day' => jdate('j', $timestamp),
            'day_name' => jdate('l', $timestamp),
            'full' => jdate('Y-m-d', $timestamp)
        ]);
    }

    function dateConvertor($dt)
    {
        $timestamp = strtotime($dt);
        return [
            'year' => jdate('Y', $timestamp),
            'month_name' => jdate('F', $timestamp),
            'day' => jdate('j', $timestamp),
            'day_name' => jdate('l', $timestamp),
            'full' => jdate('Y-m-d 🕛 H:i:s', $timestamp)
        ];
    }

    function getRequestCommission()
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $tbl = ['p_request', 'id'];
        $this->request_method('POST');
        $data = $this->model->requestCommission();

        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
            exit();
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function signIn()
    {
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data->email) && !empty($data->password)) {
            $result = $this->model->signIn($data->email);

            if (is_array($result) && !empty($result)) {
                // Verify the hash against the password entered
                $verify = password_verify($data->password, $result[0]['password']);

                if ($verify) {
                    // $res = (new Email)->send($data->email, 'ورود به حسا کاربی', 'کارر گرمی شما هم کون اد حساب کاربی خود دید');
                    // echo $res;
                    (new Httpresponse)->set(202);
                    echo json_encode([
                        "result" => true,
                        "message" => URL . 'panel',
                        //"user_info" => $result,
                        "token" => (new JWTAuth)->encode(["email" => $data->email, "avatar" => $result[0]['avatar'], "user" => true])
                    ]);
                } else {
                    (new Httpresponse)->set(200);
                    $this->_error = "نام کربری یا کلمه عبو شتباه است!";
                    echo json_encode(["result" => false, "message" => $this->_error]);
                }
            } else {
                (new Httpresponse)->set(200);
                $this->_error = "نام ربری ا لمه عور  است!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        }
    }

    function signUp()
    {
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data->email) && !empty($data->password)) {
            $checkDuplicatedEmail = $this->model->checkDuplicatedUser($data->email);

            if (is_numeric($checkDuplicatedEmail['total']) && $checkDuplicatedEmail['total'] <= 0) {
                $result = $this->model->command('insert', ['user', 'id'], ['email' => $data->email, 'password' => password_hash($data->password, PASSWORD_DEFAULT)]);
                if ($result) {
                    (new Httpresponse)->set(202);

                    echo json_encode([
                        "result" => true,
                        "message" => URL . 'panel',
                        //"user_info" => $result,
                        "token" => (new JWTAuth)->encode(["email" => $data->email, "user" => true])
                    ]);
                } else {
                    (new Httpresponse)->set(401);
                    $this->_error = "ام کربری یا لمه بور اشتباه است!";
                    echo json_encode(["result" => false, "message" => $this->_error]);
                }
            } else {
                $this->_error = 'ای ایل قبلا در ستم ثب شده است، لف از بخش رود ه حاب کاربری ارد وید';
                echo json_encode(["result" => false, "message" => $this->_error]);
            }

            //            if (!empty($result) && is_array($result)) {
            //
            //            } else {
            //
            //            }
        }
    }

    function dashboard()
    {
        $this->authorization();
        $this->request_method("GET");

        $data = $this->model->dashboard();
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function expert()
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $tbl = ['expert', 'id'];
        $this->request_method('POST');
        $data = $this->model->expert($tbl, $data);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function requestFiltered()
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $tbl = ['p_request', 'id'];
        $this->request_method('POST');
        $data = $this->model->requestFiltered($data);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }


    function updateRequestFormContent($id)
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $tbl = ['p_request', 'id'];
        $this->request_method('POST');
        $data = $this->model->updateRequestFormContent($tbl, $data, $id);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }


    function employee()
    {
        $entityBody = file_get_contents('php://input');
        $table = ['employee', 'id'];
        $this->request_method('GET');
        $data = $this->model->employee($table);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function location($token)
    {
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $tbl = ['track', 'id'];
        $this->request_method('POST');
        $data = $this->model->location($token, $data);
        if (!empty($data) && is_numeric($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function printData()
    {
        $entityBody = file_get_contents('php://input');
        $tbl = ['print_data', 'id'];
        $this->request_method('GET');
        $data = $this->model->printData($tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function robotQuery()
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $tbl = ['p_layer', 'id'];
        $this->request_method('POST');
        $data = $this->model->robotQuery($tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }
    function layer()
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $tbl = ['p_layer', 'id'];
        $this->request_method('POST');
        $data = $this->model->layer($tbl, $data);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }
    function passageList()
    {
        $tbl = ['p_request', 'id'];
        $this->request_method('GET');
        $data = $this->model->passageList($tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function ideaList()
    {
        $tbl = ['idea', 'id'];
        $this->request_method('GET');
        $data = $this->model->ideaList($tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function passageEdit()
    {
        $tbl = ['p_request', 'id'];
        $this->request_method('GET');
        $data = $this->model->passageEdit($tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function passageUpdate($id)
    {
        $entityBody = file_get_contents('php://input');
        $data = (array) json_decode($entityBody);
        $tbl = ['p_request', 'id'];
        $this->request_method('POST');


        $data = $this->model->command('update', $tbl, $data, $id);
        if (($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }



    function ideaEdit()
    {
        $tbl = ['idea', 'id'];
        $this->request_method('GET');
        $data = $this->model->ideaEdit($tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function ideaUpdate($id)
    {
        $entityBody = file_get_contents('php://input');
        $data = (array) json_decode($entityBody);
        $tbl = ['idea', 'id'];
        $this->request_method('POST');


        $data = $this->model->command('update', $tbl, $data, $id);
        if (($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }



    function updateLayer($id)
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $tbl = ['p_layer', 'id'];
        $this->request_method('POST');
        $data = $this->model->updateLayer($data, $id);
        if (($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }
    function allLayer()
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $tbl = ['p_layer', 'id'];
        $this->request_method('POST');
        $data = $this->model->allLayer('fetch', $tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function allCategory()
    {
        $entityBody = file_get_contents('php://input');
        $tbl = ['p_category', 'id'];
        $this->request_method('GET');
        $data = $this->model->command('fetch', $tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }
    function delLayer($id)
    {
        $this->authorization();
        $tbl = ['p_layer', 'id'];
        $this->request_method('POST');
        $data = $this->model->command('delete', $tbl, false, $id);

        if (!empty($data) && is_numeric($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function deleteCategory($id)
    {
        $this->authorization();
        $tbl = ['p_category', 'id'];
        $this->request_method('POST');
        $data = $this->model->command('delete', $tbl, false, $id);

        if (!empty($data) && is_numeric($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    // سمت شهروند اجرا میشه
    function deletePassage($id)
    {
        $tbl = ['p_request', 'id'];
        $this->request_method('POST');
        $data = $this->model->command('delete', $tbl, false, $id);

        if (!empty($data) && is_numeric($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }


    function deleteIdea($id)
    {
        $tbl = ['idea', 'id'];
        $this->request_method('POST');
        $data = $this->model->command('delete', $tbl, false, $id);

        if (!empty($data) && is_numeric($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }


    function delProceeding($id)
    {
        $this->authorization();
        $tbl = ['p_proceedings', 'id'];
        $this->request_method('POST');
        $data = $this->model->command('delete', $tbl, false, $id);

        if (!empty($data) && is_numeric($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function requestDetail($id)
    {
        // $this->authorization();
        $entityBody = file_get_contents('php://input');
        $tbl = ['p_request', 'id'];
        $this->request_method('GET');
        $data = $this->model->requestDetail($tbl, $id);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            //$data['request'][0]['dt'] = jdate('Y-m-d', strtotime($data['request'][0]['dt']));
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }
    function requestCommissionDetail($id)
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $tbl = ['p_request', 'id'];
        $this->request_method('GET');
        $data = $this->model->requestCommissionDetail($tbl, $id);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function tile()
    {
        $tbl = ['p_tile', 'id'];
        $this->request_method('GET');
        $data = $this->model->tile($tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }


    function requestDetailConfirmation($ids, $token)
    {
        $entityBody = file_get_contents('php://input');
        $tbl = ['p_request', 'id'];
        $this->request_method('GET');
        $data = $this->model->requestDetailConfirmation($tbl, $ids, $token);
        if (!empty($data) && is_array($data) && !empty($data['request']) && !empty($data['commission'])) {
            (new Httpresponse)->set(200);

            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function requestStatus()
    {
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data->id) && !is_null($data->val)) {
            $result = $this->model->command('update', ['p_request', 'id'], ['status' => $data->val], $data->id);

            if ($result) {
                (new Httpresponse)->set(202);

                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت اپدیت شد',
                    "admin_info" => $result
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        }
    }
    function requestCategory()
    {
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data->id) && !is_null($data->val)) {
            $result = $this->model->command('update', ['p_request', 'id'], ['category_id' => (empty($data->val) ? null : $data->val)], $data->id);

            if ($result) {
                (new Httpresponse)->set(202);

                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت اپدیت شد',
                    "admin_info" => $result
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        }
    }

    function saveFormContent()
    {
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data->ids)) {
            $result = $this->model->saveFormContent($data);

            if ($result) {
                (new Httpresponse)->set(202);

                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت اپدیت شد',
                    "admin_info" => $result
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        }
    }

    function saveLayer()
    {
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data->name) && !is_null($data->layers)) {
            $result = $this->model->command('insert', ['p_layer', 'id'], [
                'name' => $data->name,
                'p_request_type_id' => $data->p_request_type_id,
                'dt' => jdate('Y-m-d H:m:s', '', '', '', 'en'),
                'layers' => json_encode($data->layers)
            ]);

            if ($result) {
                (new Httpresponse)->set(202);

                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت اپدیت شد',
                    "admin_info" => $result
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        }
    }


    function newCategory()
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data->name)) {
            $result = $this->model->command('insert', ['p_category', 'id'], [
                'name' => $data->name
            ]);

            if ($result) {
                (new Httpresponse)->set(202);

                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت اپدیت شد'
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        }
    }

    function requestSignatureSave()
    {
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data->commission_id) && !is_null($data->request_id)) {

            $check = $this->model->checkSignatureCount($data->request_id, $data->commission_id);

            if (!empty($check) && is_array($check) && count($check) > 0) exit();


            $result = $this->model->command(
                'insert',
                ['p_request_commission', 'id'],
                [
                    'p_request_id' => $data->request_id,
                    'p_commission_id' => $data->commission_id,
                ]
            );

            if ($result) {
                (new Httpresponse)->set(202);

                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت اپدیت شد',
                    "admin_info" => $result
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        }
    }


    function requestFormContent()
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data->id)) {
            $post = [
                'fullname' => $data->fullname,
                'tel' => $data->tel,
                'address' => $data->address,
                'address_location' => $data->address_location,
                'title' => $data->title,
                'suggestion_names' => $data->suggestion_names,
                'form_content' => $data->form_content,
                'description' => $data->description,
                'accepted_name' => $data->accepted_name,
                'main_attachment' => $data->main_attachment,
                'other_attachment' => $data->other_attachment,

                'description' => $data->description,
                'accepted_name' => $data->accepted_name
            ];
            $result = $this->model->command('update', ['p_request', 'id'], $post, $data->id);

            if ($result) {
                (new Httpresponse)->set(202);

                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت اپدیت شد',
                    "admin_info" => $result
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        }
    }

    function updateProceeding($id)
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($id)) {
            $data =  json_decode(json_encode($data), true);

            $result = $this->model->command('update', ['p_proceedings', 'id'],  $data, $id);

            if ($result) {
                (new Httpresponse)->set(202);

                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت اپدیت شد',
                    "admin_info" => $result
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        }
    }


    function newProceeding()
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data)) {


            //   var_dump(json_encode($data->request_list));
            //   die;
            $result = $this->model->command('insert', ['p_proceedings', 'id'], [
                "request_list" => json_encode($data->request_list)
            ]);

            if ($result) {
                (new Httpresponse)->set(202);

                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت ایجاد شد'
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        }
    }

    function report()
    {
        $this->authorization();
        $tbl = ['p_layer', 'id'];
        $this->request_method("GET");
        $data = $this->model->report($tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function reportAllRequest()
    {
        $this->authorization();
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        $data = $this->model->reportAllRequest($data);

        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function commission()
    {
        $this->authorization();
        $tbl = ['p_commission', 'id'];
        $this->request_method("GET");
        $data = $this->model->commission($tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function service()
    {
        $tbl = ['service', 'id'];
        $this->request_method("GET");
        $data = $this->model->service($tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function commissionAll()
    {
        $this->authorization();
        $tbl = ['p_commission', 'id'];
        $this->request_method("GET");
        $data = $this->model->command('fetch', $tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function requestType()
    {
        $tbl = ['p_request_type', 'id'];
        $this->request_method("GET");
        $data = $this->model->command('fetch', $tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function header()
    {
        $tbl = ['p_header', 'id'];
        $this->request_method("GET");
        $data = $this->model->command('fetch', $tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function updateHeader()
    {
        $tbl = ['p_header', 'id'];
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data) && !is_null($data)) {
            $result = $this->model->command('update', $tbl, [
                'show_content' => $data->show_content,
                'sign_content' => $data->sign_content
            ], 1);

            if ($result) {
                (new Httpresponse)->set(202);

                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت بروزرسانی گردید'
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        }
    }

    function requestTypeFilter()
    {
        $tbl = ['p_request_type', 'id'];
        $this->request_method("GET");
        $data = $this->model->requestTypeFilter($tbl);
        if (!empty($data) && is_array($data)) {
            (new Httpresponse)->set(200);
            echo json_encode($data);
        } else {
            $this->_error = "Not found any record!";
            $this->Error();
        }
    }

    function subscription()
    {
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data->endpoint) && !empty($data->keys)) {
            $data = [
                'push_subscription' => json_encode($data),
                'ip' => (new Ip)->get()
            ];
            $result = $this->model->subscription($data);

            if (!empty($result) && is_numeric($result)) {
                (new Httpresponse)->set(202);

                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت ض شدید',
                    "admin_info" => $result
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        }
    }

    function uploadRequestDoc($id, $field)
    {
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");


        if (!empty($_FILES[$field]['name'])) {
            $_POST[$field] = (new Upload)->documentUpload($field, 0, time());
            $result = $this->model->uploadRequestDoc($_POST[$field], $id, $field);
            if ($result) {
                (new Httpresponse)->set(202);
                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت ثبت شد'
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        } else {
            echo "no file selected";
        }
    }


    function uploadRequestDocIdea($id, $field)
    {
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");


        if (!empty($_FILES[$field]['name'])) {
            $_POST[$field] = (new Upload)->storeImageFile($field, time());
            $result = $this->model->uploadRequestDocIdea($_POST[$field], $id, $field);
            if ($result) {
                (new Httpresponse)->set(202);
                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت ثبت شد'
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        } else {
            echo "no file selected";
        }
    }

    function delDoc($id, $field)
    {
        $entityBody = file_get_contents('php://input');
        $data = json_decode($entityBody);
        $this->request_method("POST");

        if (!empty($data->name)) {
            $filename = URL . "upload/doc/" .    $data->name;
            if (file_exists($filename)) {
                unlink($filename);
                (new Httpresponse)->set(202);
                echo json_encode([
                    "result" => true,
                    "message" => 'با موفقیت ثبت شد'
                ]);
            } else {
                (new Httpresponse)->set(401);
                $this->_error = "error!";
                echo json_encode(["result" => false, "message" => $this->_error]);
            }
        } else {
            echo "no file selected";
        }
    }



    private function request_method($arg)
    {
        //header("Access-Control-Allow-Methods: " . $arg);
        if (empty($arg) || $_SERVER['REQUEST_METHOD'] !== $arg) {
            (new Httpresponse)->set(405);
            echo ('{"message":"Request method must be correct set!"}');
            exit();
        }
    }

    private function _showError()
    {
        if (!empty($this->_error)) {
            $this->Error();
        }
    }


    /**
     * Authorization
     * @param String $key
     */
    private function Error()
    {
        if (isset($this->_error)) {
            if (!empty($this->_error)) {
                (new Httpresponse)->set(400);
                echo json_encode([
                    "result" => false,
                    "message" => $this->_error
                ]);
            }
        } else {
            (new Httpresponse)->set(400);
            echo ('{"message":"Please contact with programmer!"}');
            exit();
        }
    }
}
