<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bon de Achat</title>
    <style>
        @font-face {
            font-family: 'Noto Sans Arabic';
            src: url('/path-to-your-fonts/NotoSansArabic-Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
        }
        body { font-family: 'Noto Sans Arabic', 'DejaVu Sans', Arial, sans-serif; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #000; }
        header, footer { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; margin-bottom: 10px; padding-bottom: 10px; }
        header p, footer p { margin: 0; }
        h1, h2 { text-align: center; margin: 10px 0; }
        .info { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .info div { display: flex; align-items: center; }
        .info label { margin-right: 5px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        table, th, td { border: 1px solid #000; }
        th, td { padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; }
        .left, .right, .center { text-align: center; }
        footer .center { flex: 1; margin-top: 20px; }
        .rtl { direction: rtl; text-align: right; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="left">
                <p>Institut pédagogique National<br>IPN</p>
            </div>
            <div class="right rtl">
                <p>المعهد التربوي الوطني</p>
            </div>
        </header>

        <h1>BON DE Achat</h1>
        <h2 class="rtl">وثيقة استخراج</h2>

        <section class="info">
            <div>
                <label for="number">N°:</label>
                <input type="text" id="number" name="number" value="">
            </div>
            <div>
                <label for="date">Date:</label>
                <input type="date" id="date" name="date" value="{{ $BonSortie->created_at->format('Y-m-d') }}">
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
                @foreach($details_BonSorties as $detail)
                <tr>
                    <td>{{ $detail->produits->designation }}</td>
                    <td>{{ $detail->quantite }}</td>
                    <td>{{ $detail->motif }}</td>
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
            <div class="center">
                <p class="rtl">استلم مطابقا للمواصفات من طرف</p>
                <p>Reçu conforme par</p>
            </div>
        </footer>
    </div>
</body>
</html>
