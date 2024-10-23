<?php

class V1_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    function command($o, $tbl, $data = false, $id = false)
    {
        switch ($o) {
            case "count":
                return $this->db->select("select count(`$tbl[1]`) as `total` from `$tbl[0]`;");
            case "fetch":
                return $this->db->select("select * from `$tbl[0]`;");
            case "delete":
                return $this->db->delete("$tbl[0]", "`$tbl[1]`='$id'");
            case "insert":
                return $this->db->insert("$tbl[0]", $data);
            case "info":
                return $this->db->select("select * from `$tbl[0]` where `$tbl[1]`=:id", [':id' => $id]);
            case "update":
                return $this->db->update("$tbl[0]", $data, "`$tbl[1]`='{$id}'");
            default:
                die("O is unknown!");
        }
    }
    function project($table)
    {
        if (isset($_GET['id'])) return $this->db->select(" SELECT t1.* FROM `project` t1 WHERE t1.id = :id", [':id' => $_GET['id']]);
        return $this->db->select("SELECT * FROM `project` order by id asc");
    }

    function userProject($table)
    {
     return $this->db->select(" SELECT t1.* FROM `project` t1 WHERE t1.user_id = :id", [':id' => $_GET['id']]);
      
    }

    function user($table)
    {
        if (isset($_GET['id'])) return $this->db->select(" SELECT t1.* FROM `user` t1 WHERE t1.id = :id", [':id' => $_GET['id']]);
        return $this->db->select("SELECT * FROM `user` order by id asc");
    }

    function point($table)
    {
        if (isset($_GET['wallet_address'])) {
            return $this->db->select("
            SELECT
                *
            FROM
                `$table[0]`
                WHERE
                status = :status and wallet_address = :wallet_address
            ORDER BY
                point
            DESC
            LIMIT 1
              ", [':status' => 1, ':wallet_address' => $_GET['wallet_address']]);
        } else {
            return $this->db->select("
            SELECT
                *
            FROM
                `$table[0]`
                WHERE
                status = :status
            ORDER BY
                point
            DESC
            LIMIT 11
              ", [':status' => 1]);
        }
    }


    function employee($table)
    {
        if (isset($_GET['token'])) {
            return $this->db->select("
    SELECT
    t1.*
FROM `employee` t1
WHERE t1.token = :token
  ", [':token' => $_GET['token']]);
        }

        return $this->db->select("
SELECT
  *
FROM
    `employee` order by id desc
");
    }

    function location($token, $data)
    {
        $employee =         $this->db->select("
        SELECT
        t1.*
    FROM `employee` t1
    WHERE t1.token = :token
      ", [':token' => $token]);

        $data = $data;


        $this->db->insert('track', [
            'employee_id' => $employee[0]['id'],
            'location' => $data,
            'description' => NULL
        ]);
        return $this->db->lastInsertId();
    }

    function signIn($email)
    {
        return $this->db->select("SELECT * FROM `admin` WHERE `email`=:email", [':email' => $email]);
    }


    public function dashboard()
    {
        return [
            'expert' => $this->db->select("select count(*) as `total` from `expert`;"),
            'department' => $this->db->select("select count(*) as `total` from `department`;"),
            'company' =>  $this->db->select("select count(*) as `total` from `company`;"),
            'deal' =>  $this->db->select("select count(*) as `total` from `deal`;"),
            'service' => $this->db->select("select count(*) as `total` from `service`;"),
            'access' =>  [["total" => 0]],
            'legal' =>   $this->db->select("select count(*) as `total` from `legal`;"),
            'password' =>  [["total" => 0]],
            'employee' =>   $this->db->select("select count(*) as `total` from `employee`;"),
            'accounting' =>   $this->db->select("select SUM(total) as `total` from `accounting`;"),
            'chart_accounting' =>   $this->db->select("select type, count(*) as `total` from `accounting` group by type;"),
            'chart_expert' =>   $this->db->select("select score, count(*) as `total` from `expert` group by score;"),
            'expert_chart' =>   $this->db->select("
            SELECT
          p.name AS `province_name`,
          COUNT(`province_id`) AS `total`
      FROM
          `expert` e
      INNER JOIN `province` p ON
          p.id = e.province_id
      GROUP BY
          `province_id`
            "),
            'deal_to_end' =>   $this->db->select("
            SELECT
            COUNT(`id`) as `total`
        FROM
            `deal`
            WHERE DATE_ADD(`dt`, INTERVAL `period` DAY) > DATE_SUB('" . jdate('Y-m-d', time()) . "', INTERVAL 30 DAY)
            "),
            'deal_to_end_list' =>   $this->db->select("
            SELECT
           *
        FROM
            `deal`
            WHERE end_dt > '" . date_format(date_sub(date_create(jdate('Y-m-d', time(), '', '', 'en')), date_interval_create_from_date_string("60 days")), "Y-m-d") . "'
            "),
            'expertWithScore' =>   $this->db->select("select count(*) as `total` from `expert` where score='0';"),
            'expertWithoutScore' =>   $this->db->select("select count(*) as `total` from `expert` where score='1';")
        ];
    }

    function expert($tbl, $data, $start = 0, $count = 10)
    {
        $q = '';
        $first = false;
        if (isset($data->id) && !empty($data->id)) {
            if ($first)
                $q .= " AND r.`id` = '" . $data->id . "'";
            else
                $q .= "WHERE r.`id` = '" . $data->id . "'";

            $first = true;
        }

        if (isset($data->fullname) && !empty($data->fullname)) {
            if ($first)
                $q .= " AND r.`fullname` like '%" . $data->fullname . "%'";
            else
                $q .= "WHERE r.`fullname` like '%" . $data->fullname . "%'";

            $first = true;
        }

        if (isset($data->status) && $data->status !== "") {
            if ($first)
                $q .= " AND r.`status` = '" . $data->status . "'";
            else
                $q .= "WHERE r.`status` = '" . $data->status . "'";

            $first = true;
        }

        if (isset($data->p_request_type_id) && !empty($data->p_request_type_id)) {
            if ($first)
                $q .= " AND r.`p_request_type_id` = '" . $data->p_request_type_id . "'";
            else
                $q .= "WHERE r.`p_request_type_id` = '" . $data->p_request_type_id . "'";

            $first = true;
        }

        if (isset($data->accepted_name) && !empty($data->accepted_name)) {
            if ($first)
                $q .= " AND r.`accepted_name` = '" . $data->accepted_name . "'";
            else
                $q .= "WHERE r.`accepted_name` = '" . $data->accepted_name . "'";

            $first = true;
        }

        if (isset($_GET['page']) && !empty($_GET['page']) && is_numeric($_GET['page'])) $start = --$_GET['page'] * $count;

        $r = [
            'list' => $this->db->select("
            SELECT
            e.*,
            COUNT(eu.id) AS `expert_upload_count`,
            a.fullname as `admin_fullname`,
            p.name as `province_name`,
            c.name as `city_name`
        FROM
            `expert` e
            left JOIN `expert_upload` eu ON
            e.id = eu.expert_id
            left JOIN `admin` a ON
            e.admin_id = a.id
            inner join `province` p on p.id = e.province_id
            inner join `city` c on c.id = e.city_id 
            WHERE e.status != -1 $q
        GROUP BY
            e.id
        ORDER BY
            e.`id`
        DESC
                  LIMIT $start, $count;"),
            'total' => $this->db->select("select count(`$tbl[1]`) as `total` from `$tbl[0]`;")[0]['total']
        ];
        return $r;
    }

    function requestFiltered($data)
    {
        return $this->db->select("
        SELECT
           r.*,
           rt.`name` as `request_type_name`
        FROM
            `p_request` r
            inner join `p_request_type` rt on
            rt.`id` = r.p_request_type_id

            WHERE r.`id` IN (" . $data->request_list . ")");
    }

    function updateRequestFormContent($tbl, $data, $id)
    {
        $data = [
            "form_content" => $data
        ];

        return $res = $this->command('update', $tbl, $data, $id);
    }





    function requestCommission()
    {
        //explode(',',$_GET['date'])
        return $this->db->select('
        SELECT
        r.*,
r.p_request_type_id,
r.accepted_name,
rt.name as `request_type_name`,
r.dt
    FROM `p_request` r
    inner join `p_request_type` rt on
    rt.id = r.p_request_type_id
      ');
    }


    function printData($tbl)
    {
        return  $this->db->select("SELECT * FROM `print_data`");
    }

    function commission($tbl, $start = 0, $count = 10)
    {
        if (isset($_GET['page']) && !empty($_GET['page']) && is_numeric($_GET['page'])) $start = --$_GET['page'] * $count;

        $r = [
            'list' => $this->db->select("
              SELECT
                 *
              FROM
                  `p_commission` r
              ORDER BY r.`id` DESC
              LIMIT $start, $count;"),
            'total' => $this->db->select("select count(`id`) as `total` from `p_commission`;")[0]['total']
        ];
        return $r;
    }

    function service($tbl, $start = 0, $count = 10)
    {
        if (isset($_GET['page']) && !empty($_GET['page']) && is_numeric($_GET['page'])) $start = --$_GET['page'] * $count;

        $r = [
            'list' => $this->db->select("
              SELECT
                 t.*
              FROM
                  `service` t
              ORDER BY t.`id` DESC
              LIMIT $start, $count;"),
            'total' => $this->db->select("select count(`id`) as `total` from `service`;")[0]['total']
        ];
        return $r;
    }

    function requestTypeFilter($tbl)
    {
        return $this->db->select("
        select * from p_request_type where people_can='1'
        ");
    }


    function checkSignatureCount($request_id, $commission_id)
    {
        return $this->db->select("
            SELECT
                *
            FROM
                `p_request_commission` rc
      where p_request_id =:p_request_id and p_commission_id =:p_commission_id 
            ", [
            ':p_request_id' => $request_id,
            ':p_commission_id' => $commission_id
        ]);
    }


    function report($tbl)
    {
        return [
            'r1' => $this->db->select("
            SELECT
                rt.name,
                COUNT(rt.id) as totalRecord
            FROM
                `p_layer` l
                INNER join `p_request_type` rt on 
                l.p_request_type_id = rt.id
               
            group by rt.id")
        ];
    }



    function reportAllRequest($data)
    {


        $q = '';
        $first = false;
        if (isset($data->start_date) && !empty($data->start_date) && isset($data->end_date) && !empty($data->end_date)) {
            if ($first)
                $q .= " AND r.`dt` between '" . $data->start_date . "' and '" . $data->end_date . "'";
            else
                $q .= "WHERE r.`dt` between '" . $data->start_date . "' and '" . $data->end_date . "'";

            $first = true;
        }

        if (isset($data->request_type) && !empty($data->request_type)) {
            if ($first)
                $q .= " AND r.`p_request_type_id` IN (" . $data->request_type . ")";
            else
                $q .= "WHERE r.`p_request_type_id` IN (" . $data->request_type . ")";

            $first = true;
        }

        if (isset($data->category) && !empty($data->category)) {
            if ($first)
                $q .= " AND r.`category_id` IN (" . $data->category . ")";
            else
                $q .= "WHERE r.`category_id` IN (" . $data->category . ")";

            $first = true;
        }

        if (isset($data->status) && !empty($data->status)) {
            if ($first)
                $q .= " AND r.`status` IN (" . $data->status . ")";
            else
                $q .= "WHERE r.`status` IN (" . $data->status . ")";

            $first = true;
        }

        // echo $q;die;


        $result = $this->db->select("
SELECT
   r.*,
   rt.name as   `request_type_name`
FROM
    `p_request` r
    INNER join `p_request_type` rt on 
    r.p_request_type_id = rt.id
$q
    order by r.`dt`
");
        return  $result;
    }






    public function subscription($data)
    {
        $count = $this->command('count', ['subscription', 'id']);
        if (is_array($count) && $count[0]['total'] < 10) {
            $data = $this->db->select(
                "INSERT INTO `subscription`(`ip`, `push_subscription`) VALUES(:ip,:push_subscription)",
                [':ip' => $data['ip'], ':push_subscription' => $data['push_subscription']]
            );
            return $this->db->lastInsertId();
        }
        return '';
    }



    public function allLink($id)
    {
        $data = $this->db->select('SELECT * FROM `link` WHERE `status`=:status ORDER BY `priority` ASC', [':status' => 1]);
        if (is_array($data) && !empty($data))
            return $data;
        else
            return 0;
    }
}
