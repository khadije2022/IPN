<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture d'avoir</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .invoice-container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        header {
            /* display: flex; */
            justify-content: space-between;
            margin-bottom: 20px;
        }

        header{
            margin: 0;
        }

        header .legalplace {
            display: block;
            color: #0073e6;
            font-weight: bold;
        }

        .invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .invoice-info,
        .recipient-info {
            width: 45%;
        }

        .additional-info {
            margin-bottom: 20px;
        }

        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .invoice-table th,
        .invoice-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }

        .invoice-table th {
            background-color: #f2f2f2;
        }

        .totals {
            text-align: right;
            margin-bottom: 20px;
        }



        .totals p {
            margin: 5px 0;
        }

        footer {
            position: fixed;
            bottom: 150;
            width: 100%;
            /* display: flex; */
            justify-content: space-between;
            margin-bottom: 20px;
        }

        footer .company-info,
        footer .bank-info {
            width: 45%;
        }

        .legalplace-footer {
            text-align: center;
        }

        .legalplace-footer .legalplace {
            color: #0073e6;
            font-weight: bold;
        }


        .description {
            text-align: center;
            margin-bottom: 20px;
        }

        img {
            width: 20%;
            height: 120px;
            margin-bottom: 20px;
            margin-left: 300px;

        }

        .Expbesoin{
            text-align: left;
            margin-bottom: 20px;

            margin-right: 0px;
        }
    </style>
</head>
<body>
    <header>
        <img  src="C:\wamp64\www\IPN\IPN\resources\images\logoipn-removebg-preview.png" alt="Description de l'image" />
        <h1 class="Expbesoin">Bon Sortie</h1>

        <h1 class="Expbesoin">Service: {{ $expressionbesoin->service->nom_responsabiliter }} </h1>

    </header>


<p class="description">{{ $expressionbesoin->description }}</p>


    <table class="invoice-table">
        <thead>
            <tr>

                <th>Catégorie</th>
                <th>Produit</th>
                <th>Quantité</th>
            </tr>
        </thead>
        <tbody>
            @foreach($details_expbesoins as $detail)
                <tr>
                    <td>{{ $detail->categorie->type }}</td>
                    <td>{{ $detail->catalogueProduit->designation }}</td>
                    <td>{{ $detail->quantite }}</td>
                </tr>
            @endforeach

        </tbody>
    </table>


    <!-- left -->
    <section class="totals">
        <p>Total Quantité: {{ $totalQuantite }}</p>

    </section>

    <footer>
        <div class="legalplace-footer">
            <span class="legalplace">Signature Directeur Générale</span>
        </div>
    </footer>
</body>
</html>
