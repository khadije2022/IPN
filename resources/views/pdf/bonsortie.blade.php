<!DOCTYPE html>
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
</html>
