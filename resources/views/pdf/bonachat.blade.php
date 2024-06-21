<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bon de Achat</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            width: 80%;
            margin: auto;
            border: 1px solid #000;
            padding: 20px;
        }
        header, footer {
            display: flex;
            justify-content: space-between;
        }
        .left {
            text-align: left;
        }
        .right {
            text-align: right;
            direction: rtl;
        }
        .rtl {
            direction: rtl;
        }
        .info {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th span {
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="left">
                <p>Institut pédagogique National<br>IPN</p>
            </div>
            <div class="right">
                <p>المعهد التربوي الوطني</p>
            </div>
        </header>

        <h1>BON DE ACHAT</h1>
        <h2 class="rtl">وثيقة استخراج</h2>

        <section class="info">
            <div>
                <label for="number">N°:</label>
                <input type="text" id="number" name="number" value="{{ $BonAchat->id }}">
            </div>
            <div>
                <label for="date">Date:</label>
                <input type="date" id="date" name="date" value="{{ $BonAchat->created_at->format('Y-m-d') }}">
            </div>
        </section>

        <table>
            <thead>
                <tr>
                    <th>Désignation<br><span class="rtl">المادة</span></th>
                    <th>Quantité<br><span class="rtl">الكمية</span></th>
                    <th>Motif<br><span class="rtl">الفرض</span></th>
                </tr>
            </thead>
            <tbody>
                @foreach($details_BonAchats as $detail)
                <tr>
                    <td>{{ $detail->produits->designation }}</td>
                    <td>{{ $detail->quantite }}</td>
                    <td>{{ $detail->date }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <footer>
            <div class="left">
                <p>La Directrice<br><span class="rtl">المديرة</span></p>
                <p>Signature et cachet<br><span class="rtl">توقيع وختم</span></p>
            </div>
            <div class="right">
                <p>Chef de Service<br><span class="rtl">رئيس المصلحة</span></p>
                <p>Chef DEIS<br><span class="rtl">رئيس القطاع DEIS</span></p>
            </div>
            <div class="center rtl">
                <p>استلم مطابقا للمواصفات من طرف</
