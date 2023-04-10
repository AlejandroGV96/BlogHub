import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MultitabComponent } from "@web-app/shared/elements";
import { Login, Register } from "../utils";
import { LoginFormComponent, RegisterFormComponent } from "../ui";

@Component({
    standalone: true,
    selector: "auth-screen",
    imports: [
        CommonModule,
        MultitabComponent,
        LoginFormComponent,
        RegisterFormComponent,
    ],
    templateUrl: "./app-auth.component.html",
    styleUrls: ["./app-auth.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAuthComponent {
    //region Login Properties
    readonly loginEmailFieldName: string = "Email";
    readonly loginEmailFieldPlaceholder: string = "Enter your email";
    readonly loginPasswordFieldName: string = "Password";
    readonly loginPasswordFieldPlaceholder: string = "Enter your password";
    //endregion

    //region Register Properties
    readonly registerUsernameFieldName: string = "Username";
    readonly registerUsernameFieldPlaceholder: string = "Enter your username";
    readonly registerEmailFieldName: string = "Email";
    readonly registerEmailFieldPlaceholder: string = "Enter your email";
    readonly registerPasswordFieldName: string = "Password";
    readonly registerPasswordFieldPlaceholder: string = "Enter your password";
    //endregion

    selectedTab: number = 0;
    readonly validationPattern: string =
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$.@$!%*?&])[A-Za-zd$@$!.%*?&].{7,}";

    readonly tabs: string[] = ["Login", "Register"];

    onLoginSubmit(e: Login) {
        console.log(e);
    }

    onRegisterSubmit(e: Register) {
        console.log(e);
    }
}
