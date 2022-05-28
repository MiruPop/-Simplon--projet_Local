package com.miru.local;

import com.miru.local.entity.Artiste;
import com.miru.local.entity.Client;

import java.util.HashSet;

public class Fixtures {

    public static Client someClient() {
        return Client.builder()
                .id(Long.valueOf(1))
                .nom("DUPONT")
                .prenom("Toto")
                .email("totos@mail.com")
                .commandes(new HashSet<>())
                .build();
    }

    public static Artiste someArtist() {
        return Artiste.builder()
                .id(Long.valueOf(1))
                .nom("theartist")
                .activite("artistic activity")
                .build();
    }

}
