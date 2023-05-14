import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    inject,
} from "@angular/core";
import { GlobalStateStore } from "../../services";
import { AsyncPipe, NgClass, NgFor, NgIf } from "@angular/common";
import {
    BehaviorSubject,
    NEVER,
    Observable,
    Subscription,
    interval,
    map,
    of,
    startWith,
    switchMap,
    takeWhile,
    tap,
    timer,
} from "rxjs";
import { ToastMessage } from "./toast-message.model";

@Component({
    standalone: true,
    selector: "agv-toast-message",
    templateUrl: "./toast-message.component.html",
    styleUrls: ["./toast-message.component.scss"],
    imports: [NgIf, AsyncPipe, NgClass, NgFor],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastMessageComponent implements OnInit, OnDestroy {
    private readonly globalStateStore: GlobalStateStore =
        inject(GlobalStateStore);
    private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

    private subscriptions: Subscription[] = [];

    private readonly INTERVAL: number = 1000;
    private readonly MAX_TIME: number = 5;
    private elapsedTime: number = 0;

    get timeRemainingInPercentage() {
        return ((this.MAX_TIME - this.elapsedTime) / this.MAX_TIME) * 100;
    }

    toastMessage$: Observable<ToastMessage | undefined> =
        this.globalStateStore.select((state) => state.toastMessage);

    timer$ = this.toastMessage$.pipe(
        switchMap((toastMessage) => {
            if (toastMessage) {
                this.elapsedTime = 0;
                return timer(0, this.INTERVAL).pipe(
                    takeWhile((val) => {
                        val = val + 1;
                        this.elapsedTime = val;
                        this.cdr.markForCheck();
                        return val <= this.MAX_TIME;
                    }),
                    map((val) => val + 1),
                );
            }
            return NEVER;
        }),
    );

    ngOnInit(): void {
        this.subscriptions.push(
            this.timer$.subscribe((val) => {
                if (val >= this.MAX_TIME) {
                    this.globalStateStore.clearToastMessage();
                }
            }),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
