<?php
$data = $this->data['data']['data'];
$total = $this->data['data']['total'];
$company = $this->data['company'];
?>
<section>
    <div class="__frame" data-width="large">

        <?php
        if (isset($_GET['insert'])) {
            $insert = $_GET['insert'];
            if ($insert == 1)
                echo '<p class="alert alert-success">اضافه شد</p>';
            else
                echo '<p class="alert alert-danger">Err: ' . $_GET['msg'] . '</p>';
        }
        ?>
        <div class="ms-Grid-row">
            <div class="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
            <div class="card">
                    <div class="card-header">جستجو</div>
                    <div class="card-body">
                        <form action="<?= URL ?>panel/<?= $this->endpoint ?>" method="get" autocomplete="off">
                        <div>
                                <fluent-text-field appearance="filled" name="q_fullname" value="<?= (isset($_GET['q_fullname']) ? $_GET['q_fullname'] : '') ?>">نام و نام خانوادگی</fluent-text-field>
                            </div>
                            <button appearance="accent" type="submit" id="btn-update">جستجو</button>
                        </form>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <ul class="d-flex justify-content-between align-items-center">
                            <li><?= $this->title ?></li>
                            <li>
                                <a href="javascript: " onclick="location.replace(location.pathname)">
                                    <i class="ms-Icon ms-Icon--Refresh" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="alert alert--warning">
                            مدیریت فایل، برای اپلود عکس چک یا هر اسنادی در قسمت آپلود فایل هر بخش امکان پذیر است.
                        </div>
                        <div class="table-responsive">
                            <table class="table table-blue table-alternate">
                                <caption></caption>
                                <thead>
                                    <th>ردیف</th>
                                    <th>نام و نام خانوادگی</th>
                                    <th>نوع حساب</th>
                                    <th>کل مبلغ</th>
                                    <th>مانده</th>
                                    <th>تاریخ</th>
                                    <th>توضیحات</th>
                                    <th width="15%">عملیات</th>
                                </thead>
                                <?php
                                foreach ($data as $key => $value) {
                                    $id = $value['id'];
                                    $status = $value['status'];
                                    $value['type'] = (!$value['type']) ? '<span class="badge badge-danger">بدهکار</span>' : '<span class="badge badge-success">بستانکار</span>';
                                    $statusText = ($status) ? ICON_ACTIVE : ICON_DEACTIVE;
                                ?>
                                    <tr>
                                        <td><?= ++$key ?></td>
                                        <td><?= $value['fullname'] ?></td>
                                        <td class="text-center"><?= $value['type'] ?></td>
                                        <td><?= number_format($value['total']) ?></td>
                                        <td><?= number_format($value['rest']) ?></td>
                                        <td><?= $value['dt'] ?></td>
                                        <td><?= $value['description'] ?></td>
                                        <td>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <a href="javascript: " onclick="handleEdit(<?= $id ?>)"><?= ICON_EDIT ?></a>
                                                <a href="<?= URL ?>panel/<?= $this->endpoint ?>/delete?id=<?= $id ?>"><?= ICON_DELETE ?></a>
                                                <a href="<?= URL ?>panel/<?= $this->endpoint ?>/status?id=<?= $id ?>&val=<?= ($status) ? '0' : '1' ?>"><?= $statusText ?></a>
                                            </div>
                                        </td>
                                    </tr>
                                <?php
                                }
                                ?>
                            </table>
                        </div>
                        <?= (new Paging)->show(PATH_ADMIN . $this->endpoint, $total, $this->pg); ?>
                    </div>
                </div>
            </div>

            <div class="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style="position:sticky;top:0">
                <div class="card">
                    <div class="card-header">عملیات</div>
                    <div class="card-body">
                        <form action="<?= URL ?>panel/<?= $this->endpoint ?>/insert" method="post" enctype="multipart/form-data" autocomplete="off">
                            <div>
                                <fluent-text-field appearance="filled" name="fullname">نام شخص</fluent-text-field>
                            </div>
                            <div>
                                <select name="type" id="">
                                    <option value="0">بدهکار</option>
                                    <option value="1">بستانکار</option>
                                </select>
                            </div>
                            <div>
                                <fluent-number-field appearance="filled" name="total">کل مبلغ</fluent-number-field>
                            </div>
                            <div>
                                <fluent-number-field appearance="filled" name="rest">مانده</fluent-number-field>
                            </div>
                            <div>
                                <fluent-text-field appearance="filled" placeholder="" name="dt">تاریخ</fluent-text-field>
                            </div>
                            <div>
                                <fluent-text-area appearance="filled" placeholder="" name="description">توضیحات</fluent-text-area>
                            </div>
                            <fluent-button appearance="accent" type="submit" id="btn-update" class="mt-10">اضافه</fluent-button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script type="text/javascript">
    const handleEdit = async (id) => {
        let result = await window.edit('<?= $this->endpoint ?>', id)
        document.querySelector('form').action = `<?= URL ?>panel/<?= $this->endpoint ?>/update/${id}`
        document.querySelector('fluent-button').innerText = "بروز رسانی"
        document.querySelector('[name="fullname"]').value = result.fullname
        document.querySelector('[name="type"]').value = result.type
        document.querySelector('[name="total"]').value = result.total
        document.querySelector('[name="rest"]').value = result.rest
        document.querySelector('[name="dt"]').value = result.dt
        document.querySelector('[name="description"]').value = result.description
    }
</script>