<?php
$data = $this->data['data']['data'];
$total = $this->data['data']['total'];
?>
<section>
    <div class="__frame" data-width="large">

        <?php
        if (isset($_GET['insert'])) {
            $insert = $_GET['insert'];
            if ($insert == 1) {
        ?>
                <script>
                    Swal.fire({
                        title: 'با موفقیت ثبت شد',
                        icon: 'success',
                        confirmButtonText: 'بستن',
                        showCloseButton: true
                    })
                </script>
        <?php
            } else {
                echo '<p class="alert alert-danger">Err: ' . $_GET['msg'] . '</p>';
            }
        }
        ?>
        <div class="ms-Grid-row">
            <div class="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
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
                        <div class="table-responsive">
                            <table class="table table-blue table-alternate">
                                <caption></caption>
                                <thead>
                                    <th>ردیف</th>
                                    <th>نام</th>
                                    <th>ایمیل</th>
                                    <th>کلمه عبور</th>
                                    <th width="45%">عملیات</th>
                                </thead>
                                <?php
                                foreach ($data as $key => $value) {
                                    $id = $value['id'];
                                ?>
                                    <tr>
                                        <td class="text-center"><?= ++$key ?></td>
                                        <td><?= $value['fullname'] ?></td>
                                        <td><?= $value['email'] ?></td>
                                        <td>***</td>
                                        <td>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <a href="javascript: " onclick="handleEdit(<?= $id ?>)"><?= ICON_EDIT ?></a>
                                                <a href="<?= URL ?>panel/<?= $this->endpoint ?>/delete?id=<?= $id ?>"><?= ICON_DELETE ?></a>
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
                        <div class="alert alert--primary">
                        امکان مشاهده پسورد وجود نداره، فقط می توانید به روز رسانی انجام دهید.
                        </div>
                        <form action="<?= URL ?>panel/<?= $this->endpoint ?>/insert" method="post" enctype="multipart/form-data" autocomplete="off">
                            <div>
                                <fluent-text-field appearance="filled" name="fullname">نام و نام خانوادگی</fluent-text-field>
                            </div>
                            <div>
                                <fluent-text-field appearance="filled" name="email">ایمیل</fluent-text-field>
                            </div>
                            <div>
                                <fluent-text-field appearance="filled" name="password">کلمه عبور</fluent-text-field>
                                <input type="hidden" name="password_hidden">
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
        document.querySelectorAll('form')[0].action = `<?= URL ?>panel/<?= $this->endpoint ?>/update/${id}`
        document.querySelector('fluent-button').innerText = "بروز رسانی"
        document.querySelector('[name="fullname"]').value = result.fullname
        document.querySelector('[name="email"]').value = result.email
        document.querySelector('[name="password_hidden"]').value = result.password

    }
</script>