import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private modalService: MdbModalService) {}

  ngOnInit(): void {
  }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { title: 'Custom title',
      buttonAction:'Custom buttonAction',
      bottomText:'custom text',
      choiceText:'change action' },
      modalClass: 'modal-dialog-centered'
    });
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }
}
