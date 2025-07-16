const templates = [
  {
    id: 1,
    text: `Good Morning Sir/Madam,
Thank you for giving me this chance to introduce myself.
My name is [Name].
I completed my degree in [Degree] from [College/University].
I love reading books.
I am from [Location].
There are [FamilyCount] people in my family.
My father is a [FatherJob].
My mother is a [MotherJob].
I have [SisterCount] sister(s) and [BrotherCount] brother(s).
I want to become a [Career] in the future.
Thank you.`,
    fields: ['Name', 'Degree', 'College/University', 'Location', 'FamilyCount', 'FatherJob', 'MotherJob', 'SisterCount', 'BrotherCount', 'Career']
  },
  {
    id: 2,
    text: `Good Morning Sir/Madam,
Thank you for this opportunity.
My name is [Name].
I am from [Origin], but I live in [CurrentLocation] now.
I studied [Major] at [University].
In my free time, I enjoy reading books and listening to music.
My strengths are learning fast and being creative.
About my family:
There are [FamilyCount] members in my family.
My father is a [FatherType] and works as a [FatherJob].
My mother is a [MotherType] and works as a [MotherJob].
My future goal is to become a [Career] like a Sales Associate / Beautician / Electrician.
Thank you again.`,
    fields: ['Name', 'Origin', 'CurrentLocation', 'Major', 'University', 'FamilyCount', 'FatherType', 'FatherJob', 'MotherType', 'MotherJob', 'Career']
  },
  {
    id: 3,
    text: `Good Morning Sir/Madam,
Thank you for giving me a chance to speak about myself.
My name is [Name]. I am from [Origin], and now I live in [CurrentLocation].
I completed my [Degree] from [University].
I am good at adjusting to new places and thinking of new ideas.
About my family:
We are [FamilyCount] people in my family.
My father is a [FatherType], and he works as a [FatherJob].
My mother is a [MotherType], and she works as a [MotherJob].
I want to grow in my career and become a good [Career] (Sales Associate / Beautician / Electrician).
Thank you again.`,
    fields: ['Name', 'Origin', 'CurrentLocation', 'Degree', 'University', 'FamilyCount', 'FatherType', 'FatherJob', 'MotherType', 'MotherJob', 'Career']
  },
  {
    id: 4,
    text: `Good Morning Sir/Madam,
First, thank you for allowing me to introduce myself.
My name is [Name].
I studied [Degree] at [College/University].
During my studies, I learned teamwork, communication, and time management.
I enjoy reading books in my free time.
I am from [Location].
There are [FamilyCount] people in my family.
My father is a [FatherJob].
My mother is a [MotherJob].
I have [SisterCount] sister(s) and [BrotherCount] brother(s).
I am a hardworking and friendly person.
I want to become a successful [Career] (Sales Associate / Beautician / Electrician).
Thank you.`,
    fields: ['Name', 'Degree', 'College/University', 'Location', 'FamilyCount', 'FatherJob', 'MotherJob', 'SisterCount', 'BrotherCount', 'Career']
  },
  {
    id: 5,
    text: `Good Morning Sir/Ma’am,
Thank you for this chance to speak about myself.
My name is [Name].
I completed my higher education from [Institution].
I also know basic computer skills.
There are 4 people in my family.
My father's name is [FatherName], and he is a [FatherJob].
My mother’s name is [MotherName], and she is a [MotherJob].
I have one [SiblingType] named [SiblingName], and he/she is a [SiblingJob].
My strength is that I work hard and stay focused.
My weakness is that I trust people easily, but I am improving.
My hobbies are exercising, playing sports, and listening to music.
I am self-motivated and always eager to learn.
Thank you once again.`,
    fields: ['Name', 'Institution', 'FatherName', 'FatherJob', 'MotherName', 'MotherJob', 'SiblingType', 'SiblingName', 'SiblingJob']
  },
  {
    id: 6,
    text: `Good Morning Sir/Madam,
Thank you for giving me a chance to introduce myself.
My name is [Name], and I am from [Location].
I completed my [Qualification] from [Institution].
We are four members in my family.
My father is a [FatherJob], and my mother is a [MotherJob].
I have one younger sister. She is looking for a job.
I enjoy playing badminton and drawing.
I learn things quickly and take responsibility seriously.
My short-term goal is to get a good job.
My long-term goal is to grow in my career and make my family proud.
Thank you again for this opportunity.`,
    fields: ['Name', 'Location', 'Qualification', 'Institution', 'FatherJob', 'MotherJob']
  }
];

const container = document.getElementById('templateCards');
const tooltip = document.getElementById('tooltip');

let selectedTemplateId = null;
let rippleTimeout;

function createRippleEffect(element, event) {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  element.style.setProperty('--ripple-x', `${x}px`);
  element.style.setProperty('--ripple-y', `${y}px`);
  element.classList.add('ripple-active');
  clearTimeout(rippleTimeout);
  rippleTimeout = setTimeout(() => {
    element.classList.remove('ripple-active');
  }, 600);
}

function createButtonRippleEffect(button, event) {
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  button.style.setProperty('--ripple-x', `${x}px`);
  button.style.setProperty('--ripple-y', `${y}px`);
  button.classList.add('ripple-active');
  setTimeout(() => {
    button.classList.remove('ripple-active');
  }, 800);
}

function highlightPlaceholders(text) {
  return text.replace(/\[(.+?)\]/g, `<span class="placeholder-highlight">[$1]</span>`);
}

// Tooltip helpers
function showTooltip(text, x, y) {
  tooltip.textContent = text;
  tooltip.style.left = x + 15 + 'px';
  tooltip.style.top = y + 15 + 'px';
  tooltip.classList.add('visible');
  document.body.classList.add('tooltip-active');
}

function hideTooltip() {
  tooltip.classList.remove('visible');
  document.body.classList.remove('tooltip-active');
}

function createLabelTooltip(field, label) {
  const tips = {
    Name: 'Your full name, e.g. Rahul Sharma',
    Degree: 'Your degree, e.g. Bachelor of Science',
    'College/University': 'Name of your college or university',
    Location: 'Where you come from, e.g. Mumbai',
    FamilyCount: 'Number of people in your family',
    FatherJob: 'Occupation of your father',
    MotherJob: 'Occupation of your mother',
    SisterCount: 'Number of sisters you have',
    BrotherCount: 'Number of brothers you have',
    Career: 'Your future career goal',
    Origin: 'Place you originally belong to',
    CurrentLocation: 'Where you currently live',
    Major: 'Your major subject',
    University: 'University name',
    FatherType: 'Type or role of your father',
    MotherType: 'Type or role of your mother',
    Institution: 'Name of your institution',
    FatherName: 'Your father\'s full name',
    MotherName: 'Your mother\'s full name',
    SiblingType: 'Type of sibling (brother/sister)',
    SiblingName: 'Sibling\'s name',
    SiblingJob: 'Sibling\'s job',
    Qualification: 'Your qualification',
  };
  return tips[field] || '';
}

// Validation: mark input as valid/invalid on input
function validateInput(input) {
  if (!input.value.trim()) {
    input.classList.remove('valid');
    input.classList.add('invalid');
  } else {
    input.classList.remove('invalid');
    input.classList.add('valid');
  }
}

function typeWriterEffect(element, text, speed=30) {
  element.textContent = '';
  let i = 0;
  function type() {
    if(i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

function renderTemplates() {
  container.innerHTML = '';

  templates.forEach(tpl => {
    const card = document.createElement('div');
    card.className = 'template-card';
    if(tpl.id === selectedTemplateId) card.classList.add('selected');

    // Ripple effect on card click
    card.addEventListener('click', (e) => {
      if(['INPUT','BUTTON','LABEL'].includes(e.target.tagName)) return;

      createRippleEffect(card, e);

      if(selectedTemplateId === tpl.id) {
        selectedTemplateId = null;
      } else {
        selectedTemplateId = tpl.id;
      }
      renderTemplates();
    });

    // Title
    const title = document.createElement('strong');
    title.textContent = `Template ${tpl.id}`;
    title.style.fontSize = '1.2rem';
    title.style.display = 'block';
    title.style.marginBottom = '10px';
    card.appendChild(title);

    // Template text with placeholder highlight
    const tplText = document.createElement('pre');
    tplText.className = 'template-text';
    tplText.innerHTML = highlightPlaceholders(tpl.text);
    card.appendChild(tplText);

    if(tpl.id === selectedTemplateId) {
      // Form
      const form = document.createElement('form');
      form.className = 'form-container';

      tpl.fields.forEach(field => {
        const label = document.createElement('label');
        const readableField = field.replace(/([A-Z])/g, ' $1').trim();
        label.textContent = `Enter ${readableField}:`;
        label.htmlFor = field + '_' + tpl.id;
        form.appendChild(label);

        // Show tooltip on label hover (desktop only)
        label.addEventListener('mouseenter', (e) => {
          if(window.innerWidth < 600) return; // no tooltip on small screens
          const tip = createLabelTooltip(field);
          if(tip) showTooltip(tip, e.pageX, e.pageY);
        });
        label.addEventListener('mouseleave', () => hideTooltip());

        const input = document.createElement('input');
        input.type = 'text';
        input.name = field;
        input.id = field + '_' + tpl.id;
        input.required = true;
        input.placeholder = createLabelTooltip(field) || '';
        form.appendChild(input);

        // Validate on input
        input.addEventListener('input', () => validateInput(input));
      });

      // Generate Button
      const generateBtn = document.createElement('button');
      generateBtn.type = 'submit';
      generateBtn.className = 'generate-btn';
      generateBtn.textContent = 'Generate Introduction';
      form.appendChild(generateBtn);

      card.appendChild(form);

      // Output container
      const outputContainer = document.createElement('div');
      outputContainer.className = 'output-container';
      outputContainer.id = 'output_' + tpl.id;
      card.appendChild(outputContainer);

      // Copy button
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = 'Copy Introduction';
      card.appendChild(copyBtn);

      // Button ripple effect on clicks
      generateBtn.addEventListener('click', (e) => {
        createButtonRippleEffect(generateBtn, e);
      });
      copyBtn.addEventListener('click', (e) => {
        createButtonRippleEffect(copyBtn, e);
      });

      // Form submit handler
      form.addEventListener('submit', e => {
        e.preventDefault();

        // Show loading indicator
        outputContainer.textContent = 'Generating... ⏳';

        // Small delay to simulate loading & show animation
        setTimeout(() => {
          let intro = tpl.text;
          tpl.fields.forEach(field => {
            const val = form[field].value.trim() || `[${field}]`;
            const regex = new RegExp(`\\[${field}\\]`, 'g');
            intro = intro.replace(regex, val);
          });

          // Typewriter effect for output
          typeWriterEffect(outputContainer, intro);

          copyBtn.style.display = 'block';

          // Confetti effect
          launchConfetti();

        }, 800);
      });

      // Copy button handler
      copyBtn.addEventListener('click', () => {
        const text = outputContainer.textContent;
        if(!text) {
          alert('Nothing to copy!');
          return;
        }
        navigator.clipboard.writeText(text).then(() => {
          alert('Introduction copied to clipboard!');
        }).catch(() => {
          alert('Copy failed, please copy manually.');
        });
      });
    }

    container.appendChild(card);
  });
}

// Simple confetti effect using canvas
function launchConfetti() {
  if(typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  } else {
    // fallback: simple emoji burst
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '20%';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '9999';
    container.style.fontSize = '2rem';
    container.style.pointerEvents = 'none';
    container.style.animation = 'confettiFall 1.5s forwards';

    ['🎉','✨','🎈','🎊','🎆'].forEach(em => {
      const span = document.createElement('span');
      span.textContent = em;
      span.style.margin = '0 3px';
      container.appendChild(span);
    });
    document.body.appendChild(container);
    setTimeout(() => document.body.removeChild(container), 1500);
  }
}

renderTemplates();