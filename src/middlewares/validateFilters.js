module.exports = function validateFilters(req, res, next) {
    const { status, valorMin, valorMax, dataIni, dataFim } = req.query;

    if(status && status !== "pendente" || status !== "paga"){
        return res.status(400).json({error: 'Status não existe'});
    }

    if(valorMin && isNaN(Number(valorMin))){
        return res.status(400).json({error: "valor mínimo deve ser um número!"})
    }

    if (valorMax && isNaN(Number(valorMax))) {
        return res.status(400).json({ error: "valor máximo deve ser um número!" })
    }

    if(dataIni && isNaN(Date.parse(dataIni))){
        return res.status(400).json({error: "data de início inválida"});
    }

    if (dataFim && isNaN(Date.parse(dataFim))) {
        return res.status(400).json({ error: "data de fim inválida" });
    }
    next();
}