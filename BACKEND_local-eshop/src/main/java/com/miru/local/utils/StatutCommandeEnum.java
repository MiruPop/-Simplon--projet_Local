package com.miru.local.utils;

public enum StatutCommandeEnum {
    TRAITEMENT("EN TRAITEMENT"),
    PREPARATION("EN PREPARATION"),
    ENVOYE("COMMANDE ENVOYEE");

    private String statutCommande;

    StatutCommandeEnum(String statut) {
        this.statutCommande = statut;
    }

    public String toString(){
        return statutCommande;
    }

    public static String getStatutCommande(String code) {
        for(StatutCommandeEnum e : StatutCommandeEnum.values()) {
            if ((e.statutCommande.equals(code)))
                return e.statutCommande;
        }
        return null;
    }
}
