package com.miru.local.utils;

public enum ModePaiementEnum {
    CARTE("card");

    private String modePaiement;

    ModePaiementEnum(String modePaiement) {
        this.modePaiement = modePaiement;
    }

    public String toString(){
        return modePaiement;
    }

    public static String getModePaiement(String code) {
        for(ModePaiementEnum e : ModePaiementEnum.values()) {
            if ((e.modePaiement.equals(code)))
                return e.modePaiement;
        }
        return null;
    }
}
