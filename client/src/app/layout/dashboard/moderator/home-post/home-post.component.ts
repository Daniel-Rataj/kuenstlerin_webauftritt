import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-post',
  standalone: true,
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class HomePostComponent {
  selectedSection: 'ausstellungen' | 'neuigkeiten' | 'ueber-mich' | 'startseite' | null = null;

  homepageCards = [
    { title: 'Startseite Ausstellungen ', description: 'Ansehen oder bearbeiten', icon: 'fas fa-images', section: 'ausstellungen' },
    { title: 'Startseite Neuigkeiten ', description: 'Ansehen oder bearbeiten', icon: 'fas fa-images', section: 'neuigkeiten' },
    { title: 'Startseite Beitrag', description: 'Ansehen oder bearbeiten', icon: 'fas fa-images', section: 'startseite' },
    { title: 'Über mich Beitrag', description: 'Ansehen oder bearbeiten', icon: 'fas fa-images', section: 'ueber-mich' },
  ];

  post = {
    ausstellungen: { title: '', text: '' },
    neuigkeiten: { title: '', text: '' },
    ueberMich: { imageFile: null as File | null, imagePreview: null as string | ArrayBuffer | null, text: '' },
    startseite: {
      imageFile: null as File | null,
      imagePreview: null as string | ArrayBuffer | null,
      title: '',
      text: '',
      showButton: false,
      buttonText: '',
      buttonLink: '',
    },
  };

  selectSection(section: any) {
    this.selectedSection = section;
  }

  onImageSelected(event: Event, targetKey: keyof typeof this.post) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      (this.post[targetKey] as any).imageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        (this.post[targetKey] as any).imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.selectedSection) return;

    console.log('Gespeichert:', this.selectedSection);
    alert('Beitrag gespeichert!');
  }
}
