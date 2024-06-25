<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bon de Sortie</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin:0;
            padding: 0;
            font-weight: bold;
        }
        .container {
            width: 100%;
            margin: auto;
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
            border: 1px solid #eee;
            padding: 20px;
            margin-top: 20px;
        }
        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            border-collapse: collapse;
        }
        .invoice-box table th {
            border-bottom: 1px solid #ddd;
            font-weight: bold;
            text-align: center;
        }
        .invoice-box table td {
            border-bottom: 1px solid #ddd;
            padding: 10px;
            text-align: center;
        }
        .invoice-box table tr:last-child td {
            border-bottom: none;
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
        img{
            width:200px;
height: 160;
            text-align: center;
            margin: 20px 15px;
        }
    </style>
</head>
<body>
    <!-- <div class="container"> -->
        <table class="surmeme_ligne">
            <tr>
                <td class="left"><h4>Institut pédagogique National IPN</h4></td>
                <td><img src="C:\wamp64\www\laravel\laravel-react-inertia\resources\images\logoipn.jpg" alt="Logo IPN"></td>
                <td class="right">
                    <h3 class="rtl">
                        المعهد التربوي الوطني
    </h3>
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
                </td>
            </tr>
        </table>

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
                @foreach($details_BonSorties as $detail)
                <tr>
                    <td>{{ $detail->produits->designation }}</td>
                    <td>{{ $detail->quantite }}</td>
                    <td>{{$BonSortie->description }}</td>
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




<!-- <!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bon de Sortie</title>
    <style>
        body {
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
        }

        .container {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            /* border: 1px solid #eee; */
            /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); */
        }

        header, footer {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        header div, footer div {
            width: 30%;
        }

        h1, h2 ,.cen{
            text-align: center;
            margin: 0;
        }

        h1 {
            margin-top: 20px;
            font-size: 24px;
        }

        h2 {
            font-size: 20px;
        }

        .info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .info div {
            width: 45%;
        }

        .invoice-box table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .invoice-box table th, .invoice-box table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        .invoice-box table th {
            background: #eee;
            font-weight: bold;
        }

        .rtl {
            text-align: right;
            direction: rtl;
        }
        .left {
            text-align: left;
        }

        .center {
            text-align: center;
        }

        .right {
            text-align: right;
        }
        @media only screen and (max-width: 600px) {
            .container {
                padding: 10px;
            }

            header, footer {
                flex-direction: column;
                align-items: center;
            }

            header div, footer div {
                width: 100%;
                text-align: center;
                margin-bottom: 10px;
            }

            .info {
                flex-direction: column;
                align-items: center;
            }

            div {
                width: 100%;
                text-align: center;
                margin-bottom: 10px;
                margin:10px
            }
            .info {
                width: 100%;
                text-align: center;
                margin-bottom: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">

                <p>Institut pédagogique National<br>IPN</p>
            <div class="rtl">
                <p>المعهد التربوي الوطني</p>
            </div>

        <h1 class="center">BON DE SORTIE <br>وثيقة استخراج</h1>

        

        <section class="info">
            <div>

            <h3>N°: {{ $BonSortie->id }}</h3>

            </div>
            <div>
                <h3>Date: {{ $BonSortie->created_at->format('Y-m-d') }}</h3>

            </div>
        </section>

        <div class="invoice-box"> 
            <table>
                <thead>
                    <tr>
                        <th>Désignation<br><span class="rtl">المادة</span></th>
                        <th>Quantité<br><span class="rtl">الكمية</span></th>
                        <th>Motif<br><span class="rtl">الفرض</span></th>
                    </tr>
                </thead>
                <tbody>
                @foreach($details_BonSorties as $detail)
                <tr>
                    <td>{{ $detail->produits->designation }}</td>
                    <td>{{ $detail->quantite }}</td>
                    <td>{{$BonSortie->description }}</td>
                </tr>
                @endforeach
                </tbody>
            </table>
        </div>

        <!-- <footer> -->
<div class="left">
        <p>Chef DEIS<br><span class="rtl">رئيس القطاع DEIS</span></p>

<div>

            <div class="right">
                La Directrice <span class="rtl">المديرة</span>
                <p>Signature et cachet<br></p>
            </div>

            <div class="center">
                <p>Chef de Service<br><span class="rtl">رئيس المصلحة</span></p>
            </div>
            <div class="center">
                <p >استلم مطابقا للمواصفات من طرف</p>
                <p>Reçu conforme par</p>
            </div>
        <!-- </footer> -->
    </div>
</body>
</html> -->
