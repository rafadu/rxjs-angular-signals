import { Component } from "@angular/core";
import { CartList } from "../cart-list/cart-list";
import { CartTotal } from "../cart-total/cart-total";


@Component({
    standalone: true,
    imports: [CartList, CartTotal],
    template: `
        <div class="row">
            <pm-cart-list/>
        </div>
        <div class="row">
            <div class="offset-md-6 col-md-6">
                <pm-cart-total />
            </div>
        </div>
    `
})
export class CartShellComponent{

}