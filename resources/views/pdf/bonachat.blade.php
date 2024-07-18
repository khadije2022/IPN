
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demande d'achat</title>
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
            border: 1px solid;
            padding: 10px;
            text-align: center;
        }
        .invoice-box table th {
            background-color: #f2f2f2;
        }
        .invoice-box table tr:last-child td {
            border-bottom: 1px solid black; /* Set the bottom border color to black */
        }
        .center p {
            margin: 0;
            padding: 0;
        }
        .margin-bottom {
            margin-bottom: 120px;
        }
        img {
            width: 100px;
            height: auto;
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
        .underline {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <table class="surmeme_ligne">
            <tr>
                <td class="left">
                    <p>République Islamique de Mauritanie<br>
                    Ministère de l'Éducation Nationale et de la Réforme du Système Éducatif<br>
                    Institut Pédagogique National</p>
                </td>
                <td class="center"><img src="../../images/logoipn.jpg" alt="Logo IPN"></td>
                <td class="right"><p>Honneur – Fraternité – Justice</p></td>
            </tr>
        </table>

        <table class="surmeme_ligne">
            <tr>
                <td class="left">
                    <h4>N°: {{ $BonAchat->id }}</h4>
                </td>
                <td class="right">
                    <h4>Nouakchott, le {{ $BonAchat->created_at->format('Y-m-d') }}</h4>
                </td>
            </tr>
        </table>

        <h3 class="center">A&nbsp;Madame la Directrice Générale</h3>
        <h3 class="center underline">DEMANDE D'ACHAT</h3>

        <div class="invoice-box">
            <table>
                <thead>
                    <tr>
                        <th>Quantité</th>
                        <th>Désignation des Fournitures</th>
                        <th>Observations</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $firstRow = true; ?>
                    @foreach($details_BonAchats as $detail)
                        <tr>
                            <td>{{ $detail->quantite }}</td>
                            <td>{{ $detail->produits->designation }}</td>
                           
                            <!-- Display description only in the first row -->
                            @if($firstRow)
                                <td rowspan="{{ count($details_BonAchats) }}">{{ $BonAchat->description }}</td>
                                <?php $firstRow = false; ?>
                            @endif
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <table class="surmeme_ligne bottom-signatures">
            <tr>
                <td class="left"><p>Service Demandeur</p></td>
                <td class="right"><p>Le Chef du Dept Concerné</p></td>
            </tr>
        </table>
    </div>

    
</body>
</html>

