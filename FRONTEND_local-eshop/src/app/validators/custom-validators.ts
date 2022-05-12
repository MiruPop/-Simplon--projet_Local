import { FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    // validation espaces vides
    static notOnlyWhitespace(control: FormControl) : ValidationErrors {
        
        // vérifier si le string contient uniquement des whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {

            // si invalid, retourner l'objet error, sous forme clé/valeur
            return { 'notOnlyWhitespace': true };
        }
        else {
            // si valid, retourner null
            return null;
        }
    }
}
