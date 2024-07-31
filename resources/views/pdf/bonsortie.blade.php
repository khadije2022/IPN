<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bon de sortie</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            font-weight: bold;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .container {
            width: 100%;
            margin: auto;
            flex: 1;
        }
        .surmeme_ligne {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .surmeme_ligne td {
            padding: 10px;
        }
        .left {
            text-align: left;
        }
        .right {
            text-align: right;
        }
        .center {
            text-align: center;
            margin: 20px 0;
        }
        .rtl {
            direction: rtl;
            display: inline-block;
        }
        .invoice-box {
            padding: 20px;
            margin-top: 20px;
        }
        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            border-collapse: collapse;
            border: 1px solid black; /* Set the border color to black */
        }
        .invoice-box table th,
        .invoice-box table td {
            border: 1px solid ;
            padding: 10px;
            text-align: center;
        }
        .invoice-box table th {
            background-color: #f2f2f2;
        }
        .invoice-box table tr:last-child td {
            border-bottom: 1px solid black; /* Set the bottom border color to black */
        }
        .invoice-box table tr:nth-child(even) {
            background: #f9f9f9;
        }
        .center p {
            margin: 0;
            padding: 0;
        }
        .margin-bottom {
            margin-bottom: 120px;
        }
        img {
            width: 200px;
            height: 160px;
            text-align: center;
            margin: 20px 15px;
        }
    </style>
</head>
<body>
    <!-- <div class="container"> -->
        .bottom-signatures {
            width: 100%;
            margin-top: 40px;
            border-collapse: collapse;
        }
        .bottom-signatures td {
            padding: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <table class="surmeme_ligne">
            <tr>
                <td class="left"><h4>Institut pédagogique National IPN</h4></td>
                <td><img src="../../images/logoipn.jpg" alt="Logo IPN"></td>
                <td class="right">
                    <h3 class="rtl">
                        المعهد التربوي الوطني
    </h3>
                    <h3 class="rtl">المعهد التربوي الوطني</h3>
                </td>
            </tr>
        </table>

        <h1 class="center">BON DE SORTIE وثيقة استخراج</h1>

        <table class="surmeme_ligne">
            <tr>
                <td class="left">
                    <h4>N°: {{ $BonSortie->id }} الرقم</h4>
                </td>
                <td class="right">
                    <h4>Date: {{ $BonSortie->created_at->format('Y-m-d') }} التاريخ</h4>
        <table class="surmeme_ligne">
            <tr>
                <td class="left">
                    <h4>N°: {{ $BonSortie->id }} :الرقم</h4>
                </td>
                <td class="right">
                    <h4>Date: {{ $BonSortie->created_at->format('Y-m-d') }} :التاريخ</h4>
>>>>>>> 211e03e6f7ceb4752bbde30c7707770c461aa8fd
                </td>
            </tr>
        </table>

        <h3 class="center">BON DE SORTIE وثيقة استخراج</h3>

        <div class="invoice-box">
            <table>
                <thead>
                    <tr>
                        <th>Désignation <span class="rtl">المادة</span></th>
                        <th>Quantité <span class="rtl">الكمية</span></th>
                        <th>Motif <span class="rtl">الفرض</span></th>
                    </tr>
                </thead>
                <tbody>
                <!--  -->
                        <th>Désignation<br><span class="rtl">المادة</span></th>
                        <th>Quantité<br><span class="rtl">الكمية</span></th>
                        <th>Motif<br><span class="rtl">الغرض</span></th>
                    </tr>
                </thead>
                <tbody>
                    <?php $firstRow = true; ?>
                    @foreach($details_BonSorties as $detail)
                        <tr>
                            <td>{{ $detail->produits->designation }}</td>
                            <td>{{ $detail->quantite }}</td>
                            <!-- Display description only in the first row -->
                            @if($firstRow)
                                <td rowspan="{{ count($details_BonSorties) }}">{{ $BonSortie->description }}</td>
                                <?php $firstRow = false; ?>
                            @endif
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="right">
            La Directrice <span class="rtl">المديرة</span>
            <p>Signature et cachet<br></p>
        </div>

        <div class="left">
            <p>Chef DEIS <span class="rtl">رئيس القطاع </span></p>
        </div>

        <div class="center margin-bottom">
            <p>Chef de Service <span class="rtl">رئيس المصلحة</span></p>
        </div>
        <div class="center">
            <p>استلم مطابقا للمواصفات من طرف</p>
            <p>Reçu conforme par</p>
        </div>
    <!-- </div> -->
</body>
</html>

