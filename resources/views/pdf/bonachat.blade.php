<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bon d'achat</title>
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
        .invoice-box table th,
        .invoice-box table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: center;
        }
        .invoice-box table th {
            background-color: #f2f2f2;
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
        img {
            width: 200px;
            height: 160px;
            text-align: center;
            margin: 20px 15px;
        }
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
                <td><img src="path/to/logoipn.jpg" alt="Logo IPN"></td>
                <td class="right">
                    <h3 class="rtl">المعهد التربوي الوطني</h3>
                </td>
            </tr>
        </table>

        <table class="surmeme_ligne">
            <tr>
                <td class="left">
                    <h4>N°: {{ $BonAchat->id }} :الرقم</h4>
                </td>
                <td class="right">
                    <h4>Date: {{ $BonAchat->created_at->format('Y-m-d') }} :التاريخ</h4>
                </td>
            </tr>
        </table>

        <h3 class="center">BON D'ACHAT وثيقة شراء</h3>

        <div class="invoice-box">
            <table>
                <thead>
                    <tr>
                        <th>Désignation<br><span class="rtl">المادة</span></th>
                        <th>Quantité<br><span class="rtl">الكمية</span></th>
                        <th>Motif<br><span class="rtl">الغرض</span></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($details_BonAchats as $detail)
                    <tr>
                        <td>{{ $detail->produits->designation }}</td>
                        <td>{{ $detail->quantite }}</td>
                        <td>{{ $BonAchat->description }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <table class="surmeme_ligne bottom-signatures">
            <tr>
                <td class="left"><p>Chef DEIS<br><span class="rtl">رئيس القطاع</span></p></td>
                <td class="right"><p>La Directrice<br><span class="rtl">المديرة</span><br>Signature et cachet</p></td>
            </tr>
            <tr>
                <td class="center" colspan="2"><p>Chef de Service<br><span class="rtl">رئيس المصلحة</span></p></td>
            </tr>
        </table>
    </div>

    <div class="center" style="margin-top: 80px;">
        <p>استلم مطابقا للمواصفات من طرف</p>
        <p>Reçu conforme par</p>
    </div>
     <div class="center" style="margin-top: 80px;">
        
    </div>            
</body>
</html>
