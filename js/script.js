const startBtn = document.getElementById("startBtn");
const surprise = document.getElementById("surprise");
const revealItems = document.querySelectorAll(".reveal");
const memoryCard = document.querySelectorAll(".memory-card");
const birthdayModal = document.getElementById("birthdayModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const birthdayAudio = document.getElementById("birthdayAudio");
const letterModal = document.getElementById("letterModal");
const openLetterBtn = document.getElementById("openLetterBtn");
const closeLetterBtn = document.getElementById("closeLetterBtn");

const syncBodyLock = () => {
  const anyModalOpen = document.querySelector(".modal-overlay:not(.hidden)");
  document.body.classList.toggle("modal-open", Boolean(anyModalOpen));
};

startBtn.addEventListener("click", () => {
  surprise.classList.remove("hidden");
  surprise.classList.add("show");
  surprise.scrollIntoView({ behavior: "smooth" });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.9 }
);

revealItems.forEach((item) => observer.observe(item));
memoryCard.forEach((item) => observer.observe(item));




if (closeModalBtn && birthdayModal) {
  closeModalBtn.addEventListener("click", () => {
    birthdayModal.classList.add("hidden");
    syncBodyLock();

    if (birthdayAudio) {
      birthdayAudio.play().catch(() => {
        // If browser still blocks playback, user can press play on audio controls.
      });
    }
  });
}


if (birthdayAudio) {
  birthdayAudio.volume = 0.5; // 50%
  birthdayAudio.currentTime = 5; // start at 0:05
  birthdayAudio.play().catch(() => {});
}

if (birthdayAudio) {
  birthdayAudio.addEventListener("loadedmetadata", () => {
    birthdayAudio.currentTime = 5;
  }, { once: true });
}

if (openLetterBtn && letterModal) {
  openLetterBtn.addEventListener("click", () => {
    letterModal.classList.remove("hidden");
    syncBodyLock();
  });
}

if (closeLetterBtn && letterModal) {
  closeLetterBtn.addEventListener("click", () => {
    letterModal.classList.add("hidden");
    syncBodyLock();
  });
}

if (letterModal) {
  letterModal.addEventListener("click", (event) => {
    if (event.target === letterModal) {
      letterModal.classList.add("hidden");
      syncBodyLock();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && letterModal && !letterModal.classList.contains("hidden")) {
    letterModal.classList.add("hidden");
    syncBodyLock();
  }
});
