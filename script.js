// JavaScript for Marxism-Leninism Historical Timeline Website with Bootstrap

// Timeline navigation variables
let currentPosition = 0;
const cardWidth = 370; // width + gap
const timeline = document.getElementById('timeline');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Bootstrap Modal
let milestoneModal;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set the background image for hero section
    setHeroBackground();

    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Initialize Bootstrap Modal
    milestoneModal = new bootstrap.Modal(document.getElementById('milestoneModal'));
    
    setupEventListeners();
    updateNavigationButtons();
    
    // Smooth scroll for navigation links
    setupSmoothScrolling();
    
    // Initialize navbar scroll behavior
    initNavbarScrollBehavior();
    
    // Initialize dropdown animations
    initDropdownAnimations();
    
    // Set initial active dropdown item
    updateActiveDropdownItem('#philosophy-overview');
});

// Navbar scroll behavior
function initNavbarScrollBehavior() {
    const navbar = document.querySelector('.navbar');
    const philosophyOverviewSection = document.getElementById('philosophy-overview');
    
    // Hide navbar initially
    navbar.classList.add('navbar-hidden');
    navbar.classList.remove('navbar-visible');
    
    // Create intersection observer for philosophy overview section
    const philosophyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Philosophy overview is visible - show navbar and keep it visible
                navbar.classList.remove('navbar-hidden');
                navbar.classList.add('navbar-visible');
                
                // Once navbar is shown, stop observing and keep it visible
                philosophyObserver.disconnect();
                
                // Add scroll listener to keep navbar visible for rest of page
                window.addEventListener('scroll', keepNavbarVisible);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-100px 0px 0px 0px' // Show navbar when philosophy overview is 100px from top
    });
    
    // Start observing the philosophy overview section
    if (philosophyOverviewSection) {
        philosophyObserver.observe(philosophyOverviewSection);
    }
}

// Function to keep navbar visible once it's shown
function keepNavbarVisible() {
    const navbar = document.querySelector('.navbar');
    const philosophyOverviewSection = document.getElementById('philosophy-overview');
    
    if (philosophyOverviewSection) {
        const philosophyTop = philosophyOverviewSection.offsetTop - 100;
        
        // If we're at or past the philosophy overview section, keep navbar visible
        if (window.scrollY >= philosophyTop) {
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
        } else {
            // If we scroll back up above philosophy overview, hide navbar again
            navbar.classList.add('navbar-hidden');
            navbar.classList.remove('navbar-visible');
        }
    }
}

// Navbar scroll effect - only for styling when visible
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    // Only apply styling effects if navbar is visible
    if (navbar.classList.contains('navbar-visible')) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Enhanced smooth scrolling with navbar consideration
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
                
                // Close dropdown if open
                const dropdownMenu = document.querySelector('.dropdown-menu.show');
                if (dropdownMenu) {
                    const dropdown = bootstrap.Dropdown.getInstance(document.querySelector('.dropdown-toggle'));
                    if (dropdown) {
                        dropdown.hide();
                    }
                }
                
                // Update active dropdown item
                updateActiveDropdownItem(this.getAttribute('href'));
            }
        });
    });
}

// Function to update active dropdown item based on current section
function updateActiveDropdownItem(targetHref) {
    // Remove active class from all dropdown items
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current item
    const currentItem = document.querySelector(`.dropdown-item[href="${targetHref}"]`);
    if (currentItem) {
        currentItem.classList.add('active');
    }
}

// Function to handle dropdown animations
function initDropdownAnimations() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu-custom');
    
    if (dropdownToggle && dropdownMenu) {
        // Handle dropdown show/hide events
        dropdownToggle.addEventListener('shown.bs.dropdown', function () {
            dropdownMenu.classList.add('show');
        });
        
        dropdownToggle.addEventListener('hidden.bs.dropdown', function () {
            dropdownMenu.classList.remove('show');
        });
        
        // Handle hover effects on desktop
        if (window.innerWidth > 768) {
            const dropdown = dropdownToggle.closest('.dropdown');
            
            dropdown.addEventListener('mouseenter', function() {
                const dropdownInstance = new bootstrap.Dropdown(dropdownToggle);
                dropdownInstance.show();
            });
            
            dropdown.addEventListener('mouseleave', function() {
                const dropdownInstance = bootstrap.Dropdown.getInstance(dropdownToggle);
                if (dropdownInstance) {
                    dropdownInstance.hide();
                }
            });
        }
    }
}

// Function to detect current section and update dropdown active state
function updateDropdownOnScroll() {
    const sections = ['#philosophy-overview', '#timeline', '#philosophy-intro', '#key-thinkers', '#applications', '#resources'];
    let currentSection = '#philosophy-overview';
    
    sections.forEach(section => {
        const element = document.querySelector(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            
            if (rect.top <= navbarHeight + 100 && rect.bottom >= navbarHeight + 100) {
                currentSection = section;
            }
        }
    });
    
    updateActiveDropdownItem(currentSection);
}

// Milestone detailed content
const milestoneDetails = {
    1: {
        title: "Nguồn gốc & Bối cảnh (1800-1840)",
        content: `
            <p>Chủ nghĩa Mác-xít ra đời từ ba nguồn gốc tư tưởng chính:</p>
            
            <h4>1. Triết học Đức</h4>
            <p>Đại diện bởi triết học cổ điển Đức với Kant, Fichte, Schelling và đặc biệt là Hegel với triết học biện chứng. Hegel đã phát triển phương pháp biện chứng nhưng trong khuôn khổ duy tâm. Feuerbach sau đó đã phê phán duy tâm và đề xuất chủ nghĩa duy vật, tạo nền tảng cho Mác phát triển chủ nghĩa duy vật biện chứng.</p>
            
            <h4>2. Kinh tế chính trị Anh</h4>
            <p>Với Adam Smith và David Ricardo, kinh tế chính trị Anh đã phân tích cấu trúc kinh tế tư bản chủ nghĩa, lý thuyết giá trị lao động. Mác đã kế thừa và phát triển những thành tựu này để xây dựng lý thuyết về giá trị thặng dư và quy luật vận động của chế độ tư bản chủ nghĩa.</p>
            
            <h4>3. Chủ nghĩa xã hội không tưởng Pháp</h4>
            <p>Saint-Simon, Fourier, Owen đã chỉ ra những mâu thuẫn của chế độ tư bản chủ nghĩa và đề xuất xã hội mới. Tuy nhiên, họ chưa tìm ra con đường thực hiện. Mác-Ăng-ghen đã kế thừa lý tưởng xã hội công bằng và tìm ra con đường cách mạng để thực hiện.</p>
        `
    },
    1: {
        title: "Nguồn gốc & Bối cảnh (1800-1840)",
        content: `
            <p>Chủ nghĩa Mác-xít ra đời từ ba nguồn gốc tư tưởng chính:</p>
            
            <h4>1. Triết học Đức</h4>
            <p>Đại diện bởi triết học cổ điển Đức với Kant, Fichte, Schelling và đặc biệt là Hegel với triết học biện chứng. Hegel đã phát triển phương pháp biện chứng nhưng trong khuôn khổ duy tâm. Feuerbach sau đó đã phê phán duy tâm và đề xuất chủ nghĩa duy vật, tạo nền tảng cho Mác phát triển chủ nghĩa duy vật biện chứng.</p>
            
            <h4>2. Kinh tế chính trị Anh</h4>
            <p>Với Adam Smith và David Ricardo, kinh tế chính trị Anh đã phân tích cấu trúc kinh tế tư bản chủ nghĩa, lý thuyết giá trị lao động. Mác đã kế thừa và phát triển những thành tựu này để xây dựng lý thuyết về giá trị thặng dư và quy luật vận động của chế độ tư bản chủ nghĩa.</p>
            
            <h4>3. Chủ nghĩa xã hội không tưởng Pháp</h4>
            <p>Saint-Simon, Fourier, Owen đã chỉ ra những mâu thuẫn của chế độ tư bản chủ nghĩa và đề xuất xã hội mới. Tuy nhiên, họ chưa tìm ra con đường thực hiện. Mác-Ăng-ghen đã kế thừa lý tưởng xã hội công bằng và tìm ra con đường cách mạng để thực hiện.</p>
        `
    },
    2: {
        title: "Mác & Ăng-ghen (1840-1883)",
        content: `
            <p>Karl Marx (1818-1883) và Friedrich Engels (1820-1895) là những người sáng lập chủ nghĩa Mác-xít, tạo ra một cuộc cách mạng trong tư duy về xã hội và lịch sử.</p>
            
            <h4>Những đóng góp chính:</h4>
            
            <h5>1. Chủ nghĩa duy vật biện chứng</h5>
            <p>Kết hợp phương pháp biện chứng của Hegel với chủ nghĩa duy vật của Feuerbach, tạo ra một công cụ khoa học để nhận thức thế giới. Ba quy luật cơ bản: quy luật chuyển hóa từ lượng sang chất, quy luật thống nhất và đấu tranh của các mặt đối lập, quy luật phủ định của phủ định.</p>
            
            <h5>2. Chủ nghĩa duy vật lịch sử</h5>
            <p>Phát hiện quy luật vận động của xã hội loài người: lực lượng sản xuất quyết định quan hệ sản xuất, cơ sở hạ tầng quyết định kiến trúc thượng tầng. Đấu tranh giai cấp là động lực phát triển xã hội.</p>
            
            <h5>3. Kinh tế chính trị Mác-xít</h5>
            <p>Lý thuyết giá trị thặng dư, phân tích bản chất bóc lột của chế độ tư bản chủ nghĩa. Tác phẩm "Tư bản" là kiệt tác phân tích khoa học về chế độ tư bản chủ nghĩa.</p>
            
            <h5>4. Chủ nghĩa xã hội khoa học</h5>
            <p>Xác định giai cấp công nhân là lực lượng cách mạng, đề ra con đường cách mạng vô sản để xây dựng xã hội xã hội chủ nghĩa và cộng sản chủ nghĩa.</p>
        `
    },
    3: {
        title: "Lê-nin (1900-1924)",
        content: `
            <p>Vladimir Ilyich Lenin (1870-1924) đã phát triển chủ nghĩa Mác-xít trong điều kiện mới của thời đại đế quốc chủ nghĩa và cách mạng vô sản.</p>
            
            <h4>Những đóng góp lý luận quan trọng:</h4>
            
            <h5>1. Lý luận về đế quốc chủ nghĩa</h5>
            <p>Phân tích đế quốc chủ nghĩa là giai đoạn cao nhất và cuối cùng của chủ nghĩa tư bản, có 5 dấu hiệu cơ bản: độc quyền, tư bản tài chính, xuất khẩu tư bản, các liên minh quốc tế độc quyển chia chốn thế giới, việc chia chốn thế giới hoàn tất.</p>
            
            <h5>2. Lý luận về cách mạng</h5>
            <p>Phát triển lý luận về cách mạng xã hội chủ nghĩa có thể thắng lợi trước tiên ở một nước hoặc một nhóm nước, không nhất thiết phải đồng thời ở tất cả các nước.</p>
            
            <h5>3. Lý luận về đảng kiểu mới</h5>
            <p>Xây dựng đảng cách mạng kiểu mới - đảng của giai cấp công nhân với tổ chức chặt chẽ, kỷ luật nghiêm minh, có vai trò lãnh đạo cách mạng.</p>
            
            <h4>Thực tiễn cách mạng:</h4>
            <p>Lãnh đạo Cách mạng Tháng Mười Nga năm 1917 thành công, lập nên nhà nước xã hội chủ nghĩa đầu tiên trên thế giới. Đây là bước ngoặt lịch sử, mở ra kỷ nguyên mới - kỷ nguyên chuyển từ chủ nghĩa tư bản lên chủ nghĩa xã hội trên phạm vi thế giới.</p>
            
            <h5>Chính sách NEP (Tân Kinh tế)</h5>
            <p>Sau chiến tranh cộng sản, Lenin đề ra chính sách Tân Kinh tế (1921), cho phép tồn tại một số thành phần kinh tế tư nhân, thể hiện tính linh hoạt trong xây dựng xã hội chủ nghĩa.</p>
        `
    },
    4: {
        title: "Chủ nghĩa Mác-Lê-nin ở Việt Nam (1920-nay)",
        content: `
            <p>Hồ Chí Minh (1890-1969) đã vận dụng sáng tạo chủ nghĩa Mác-Lê-nin vào điều kiện cụ thể của Việt Nam, tạo ra tư tưởng Hồ Chí Minh.</p>
            
            <h4>Quá trình tiếp nhận và vận dụng:</h4>
            
            <h5>1. Giai đoạn tìm hiểu và tiếp nhận (1911-1930)</h5>
            <p>Hồ Chí Minh tìm hiểu các tư tưởng giải phóng, từ dân chủ tư sản đến chủ nghĩa xã hội. Cách mạng Tháng Mười Nga và Luận cương về vấn đề dân tộc và thuộc địa của Lenin đã thuyết phục Hồ Chí Minh theo con đường cách mạng vô sản.</p>
            
            <h5>2. Giai đoạn vận dụng sáng tạo (1930-1945)</h5>
            <p>Thành lập Đảng Cộng sản Việt Nam (1930), xây dựng đường lối cách mạng dân tộc dân chủ nhân dân, kết hợp giải phóng dân tộc với giải phóng giai cấp và con người.</p>
            
            <h4>Những đóng góp sáng tạo:</h4>
            
            <h5>1. Kết hợp chặt chẽ giải phóng dân tộc với giải phóng giai cấp</h5>
            <p>Trong điều kiện Việt Nam là nước thuộc địa, Hồ Chí Minh đã kết hợp nhiệm vụ giải phóng dân tộc với giải phóng giai cấp, lấy giải phóng dân tộc làm nhiệm vụ trước mắt và cấp bách nhất.</p>
            
            <h5>2. Đường lối cách mạng dân tộc dân chủ nhân dân</h5>
            <p>Xây dựng mặt trận thống nhất rộng rãi, đoàn kết tất cả các tầng lớp nhân dân có thể đoàn kết được để chống kẻ thù chung.</p>
            
            <h5>3. Tư tưởng về xây dựng con người mới</h5>
            <p>Đề cao phẩm chất đạo đức cách mạng: "Cần, kiệm, liêm, chính, chí công vô tư". Kết hợp giáo dục với lao động, lý luận với thực tiễn.</p>
            
            <h4>Kết quả lịch sử:</h4>
            <p>Cách mạng Tháng Tám 1945 thành công, thành lập nước Việt Nam Dân chủ Cộng hòa. Chiến thắng trong hai cuộc kháng chiến chống Pháp và Mỹ, thống nhất đất nước năm 1975.</p>
        `
    },
    5: {
        title: "Ứng dụng đương đại (1986-nay)",
        content: `
            <p>Từ Đại hội VI (1986), Đảng Cộng sản Việt Nam đã đề ra đường lối đổi mới, vận dụng sáng tạo chủ nghĩa Mác-Lê-nin trong điều kiện mới.</p>
            
            <h4>1. Kinh tế thị trường định hướng xã hội chủ nghĩa</h4>
            <p>Đây là mô hình kinh tế độc đáo, kết hợp cơ chế thị trường với định hướng xã hội chủ nghĩa. Nhiều thành phần kinh tế cùng tồn tại và phát triển, nhưng dưới sự lãnh đạo của Đảng và quản lý của Nhà nước.</p>
            
            <h5>Đặc điểm:</h5>
            <ul>
                <li>Kinh tế nhà nước giữ vai trò chủ đạo</li>
                <li>Kinh tế tập thể phát triển mạnh</li>
                <li>Kinh tế tư nhân là động lực quan trọng</li>
                <li>Kinh tế có vốn đầu tư nước ngoài được khuyến khích</li>
            </ul>
            
            <h4>2. Phát triển bền vững</h4>
            <p>Việt Nam đã sớm nhận thức tầm quan trọng của phát triển bền vững, cân bằng giữa phát triển kinh tế, tiến bộ xã hội và bảo vệ môi trường.</p>
            
            <h5>Các chính sách chính:</h5>
            <ul>
                <li>Chiến lược tăng trưởng xanh</li>
                <li>Chuyển đổi năng lượng sạch</li>
                <li>Bảo vệ đa dạng sinh học</li>
                <li>Ứng phó biến đổi khí hậu</li>
            </ul>
            
            <h4>3. Ứng dụng trí tuệ nhân tạo (AI)</h4>
            <p>Trong bối cảnh cuộc cách mạng công nghiệp 4.0, Việt Nam đang tích cực ứng dụng AI vào phát triển kinh tế-xã hội.</p>
            
            <h5>Các lĩnh vực ưu tiên:</h5>
            <ul>
                <li>Chính phủ điện tử, chính phủ số</li>
                <li>Y tế thông minh</li>
                <li>Giáo dục trực tuyến</li>
                <li>Nông nghiệp thông minh</li>
                <li>Giao thông thông minh</li>
            </ul>
            
            <h4>4. Bảo vệ môi trường</h4>
            <p>Cam kết đạt mức phát thải ròng bằng 0 vào năm 2050, phát triển kinh tế tuần hoàn, giảm thiểu rác thải nhựa.</p>
            
            <h4>Thành tựu và triển vọng:</h4>
            <p>Sau hơn 35 năm đổi mới, Việt Nam đã đạt được những thành tựu to lớn: GDP tăng trưởng bình quân 6-7%/năm, đời sống nhân dân được cải thiện đáng kể, vị thế quốc tế ngày càng được nâng cao. Việt Nam đang hướng tới mục tiêu trở thành nước phát triển, thu nhập cao vào năm 2045.</p>
        `
    }
};

// Setup event listener
 fu


function setupEventListeners() {
    // Timeline navigation
    prevBtn.addEventListener('click', navigatePrevious);
    nextBtn.addEventListener('click', navigateNext);
    
    // Milestone cards
    
    const milestoneCards = document.querySelectorAll('.milestone-card');
    milestoneCards.forEach(card => {
        card.addEventListener('click', () => {
            const milestoneId = card.getAttribute('data-milestone');
            openModal(milestoneId);
        });
        
        // Add hover effect with Bootstrap tooltip
        card.setAttribute('data-bs-toggle', 'tooltip');
        card.setAttribute('title', 'Nhấp để xem chi tiết');
    });
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Add scroll listener for dropdown active state
    window.addEventListener('scroll', updateDropdownOnScroll);
}

// Function to detect current section and update dropdown active state
function updateDropdownOnScroll() {
    const sections = ['#philosophy-overview', '#timeline', '#philosophy-intro', '#key-thinkers', '#applications', '#resources'];
    let currentSection = '#philosophy-overview';
    
    sections.forEach(section => {
        const element = document.querySelector(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            
            if (rect.top <= navbarHeight + 100 && rect.bottom >= navbarHeight + 100) {
                currentSection = section;
            }
        }
    });
    
    updateActiveDropdownItem(currentSection);
}

function updateTimelinePosition() {
    timeline.style.transform = `translateX(-${currentPosition}px)`;
}

function getMaxScrollPosition() {
    const timelineWidth = timeline.scrollWidth;
    const containerWidth = timeline.parentElement.clientWidth;
    return Math.max(0, timelineWidth - containerWidth);
}

function updateNavigationButtons() {
    const maxPosition = getMaxScrollPosition();
    
    prevBtn.disabled = currentPosition <= 0;
    nextBtn.disabled = currentPosition >= maxPosition;
    
    // Add visual feedback
    if (prevBtn.disabled) {
        prevBtn.style.opacity = '0.5';
    } else {
        prevBtn.style.opacity = '1';
    }
    
    if (nextBtn.disabled) {
        nextBtn.style.opacity = '0.5';
    } else {
        nextBtn.style.opacity = '1';
    }
}

// Keyboard navigation
function handleKeyboard(e) {
    switch(e.key) {
        case 'ArrowLeft':
            navigatePrevious();
            break;
        case 'ArrowRight':
            navigateNext();
            break;
        case 'Escape':
            milestoneModal.hide();
            break;
    }
}

// Enhanced quiz answers with more philosophical depth
const quizAnswers = {
    q1: 'a', // Triết học Đức, kinh tế chính trị Anh, chủ nghĩa xã hội không tưởng Pháp
    q2: 'b', // Hồ Chí Minh
    q3: 'b', // 1917
    q4: 'a', // Quy luật chuyển hóa từ lượng sang chất
    q5: 'c', // Lực lượng sản xuất quyết định quan hệ sản xuất
    q6: 'b'  // Kinh tế thị trường định hướng xã hội chủ nghĩa
};

// Add more detailed quiz explanations
const quizExplanations = {
    q1: "Ba nguồn gốc tư tưởng của chủ nghĩa Mác-xít là triết học cổ điển Đức (đặc biệt là triết học Hegel và Feuerbach), kinh tế chính trị cổ điển Anh (Adam Smith, David Ricardo), và chủ nghĩa xã hội không tưởng Pháp (Saint-Simon, Fourier, Owen).",
    q2: "Chủ tịch Hồ Chí Minh đã vận dụng sáng tạo chủ nghĩa Mác-Lê-nin vào điều kiện cụ thể của Việt Nam, tạo ra tư tưởng Hồ Chí Minh - một hệ thống tư tưởng hoàn chỉnh về cách mạng và xây dựng chủ nghĩa xã hội ở Việt Nam.",
    q3: "Cách mạng Tháng Mười Nga diễn ra năm 1917 dưới sự lãnh đạo của V.I. Lenin và Đảng Bolshevik, đánh dấu sự ra đời của nhà nước xã hội chủ nghĩa đầu tiên trên thế giới.",
    q4: "Quy luật chuyển hóa từ lượng sang chất thể hiện rằng sự tích lũy những thay đổi về lượng đến một giới hạn nhất định sẽ dẫn đến sự thay đổi căn bản về chất, tạo ra sự vật mới.",
    q5: "Theo chủ nghĩa duy vật lịch sử, lực lượng sản xuất (bao gồm người lao động, tư liệu lao động và đối tượng lao động) quyết định tính chất của quan hệ sản xuất.",
    q6: "Kinh tế thị trường định hướng xã hội chủ nghĩa là mô hình kinh tế độc đáo của Việt Nam, kết hợp cơ chế thị trường với định hướng và mục tiêu xã hội chủ nghĩa."
};

// Modal functions
function openModal(milestoneId) {
    const milestone = milestoneDetails[milestoneId];
    if (milestone) {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h3>${milestone.title}</h3>
            ${milestone.content}
        `;
        milestoneModal.show();
    }
}

// Timeline navigation functions
function navigatePrevious() {
    if (currentPosition > 0) {
        currentPosition -= cardWidth;
        updateTimelinePosition();
        updateNavigationButtons();
        
        // Add animation effect
        timeline.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

function navigateNext() {
    const maxPosition = getMaxScrollPosition();
    if (currentPosition < maxPosition) {
        currentPosition += cardWidth;
        updateTimelinePosition();
        updateNavigationButtons();
        
        // Add animation effect
        timeline.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

// Quiz functionality with enhanced animations
function checkQuiz() {
    const resultDiv = document.getElementById('quizResult');
    let score = 0;
    let totalQuestions = Object.keys(quizAnswers).length;
    
    // Check each answer
    for (let question in quizAnswers) {
        const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === quizAnswers[question]) {
            score++;
        }
    }
    
    // Display result with animation
    const percentage = (score / totalQuestions) * 100;
    let resultText = `Kết quả: ${score}/${totalQuestions} câu đúng (${percentage.toFixed(0)}%)`;
    let resultIcon = '';
    
    if (percentage >= 80) {
        resultText += " - Xuất sắc! Bạn đã nắm vững kiến thức về lịch sử Chủ nghĩa Mác-Lê-nin.";
        resultDiv.className = 'quiz-result correct alert alert-success';
        resultIcon = '<i class="bi bi-trophy-fill me-2"></i>';
    } else if (percentage >= 60) {
        resultText += " - Khá tốt! Bạn cần ôn lại một số kiến thức.";
        resultDiv.className = 'quiz-result correct alert alert-info';
        resultIcon = '<i class="bi bi-award-fill me-2"></i>';
    } else {
        resultText += " - Bạn cần học thêm về lịch sử Chủ nghĩa Mác-Lê-nin.";
        resultDiv.className = 'quiz-result incorrect alert alert-warning';
        resultIcon = '<i class="bi bi-exclamation-triangle-fill me-2"></i>';
    }
    
    resultDiv.innerHTML = resultIcon + resultText;
    resultDiv.style.display = 'block';
    
    // Add confetti effect for high scores
    if (percentage >= 80) {
        createConfetti();
    }
    
    // Show correct answers after delay
    setTimeout(() => {
        showCorrectAnswers();
    }, 2000);
}

// Create confetti effect
function createConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Create confetti from multiple points
        if (window.confetti) {
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }
    }, 250);
}

// Enhanced quiz result display with explanations
function showCorrectAnswers() {
    for (let question in quizAnswers) {
        const correctAnswer = document.querySelector(`input[name="${question}"][value="${quizAnswers[question]}"]`);
        const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
        
        if (correctAnswer) {
            const correctOption = correctAnswer.closest('.option-item');
            correctOption.style.background = 'rgba(76, 175, 80, 0.3)';
            correctOption.style.border = '2px solid #4caf50';
            correctOption.style.borderRadius = '10px';
            
            // Add explanation
            if (quizExplanations[question]) {
                const explanationDiv = document.createElement('div');
                explanationDiv.className = 'explanation-text mt-2 p-2 bg-info bg-opacity-10 rounded';
                explanationDiv.innerHTML = `<small><strong>Giải thích:</strong> ${quizExplanations[question]}</small>`;
                correctOption.appendChild(explanationDiv);
            }
        }
        
        if (selectedAnswer && selectedAnswer !== correctAnswer) {
            const incorrectOption = selectedAnswer.closest('.option-item');
            incorrectOption.style.background = 'rgba(244, 67, 54, 0.3)';
            incorrectOption.style.border = '2px solid #f44336';
            incorrectOption.style.borderRadius = '10px';
        }
    }
}

// Responsive timeline adjustment
window.addEventListener('resize', function() {
    currentPosition = 0;
    updateTimelinePosition();
    updateNavigationButtons();
});

// Enhanced loading animations
window.addEventListener('load', function() {
    // Add progressive card loading animation
    const cards = document.querySelectorAll('.milestone-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 100 + (index * 150));
    });
    
    // Add fade-in effect to other elements
    const fadeElements = document.querySelectorAll('.question, .section-title');
    fadeElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
});

// Add intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.milestone-card, .question, .section-title');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Add CSS class for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Simplified background setup - no effects
function setHeroBackground() {
    console.log('Using simple local background: lenin-monument.jpg');
    // No JavaScript effects needed
}

// Feedback and rating functions
function submitRating(type) {
    const button = event.target.closest('button');
    const originalText = button.innerHTML;
    
    // Visual feedback
    button.disabled = true;
    
    if (type === 'positive') {
        button.innerHTML = '<i class="bi bi-check-circle me-1"></i>Cảm ơn!';
        button.className = 'btn btn-sm btn-success';
        
        // Show thank you message
        showFeedbackMessage('Cảm ơn bạn đã đánh giá tích cực! Phản hồi của bạn giúp chúng tôi rất nhiều.', 'success');
    } else {
        button.innerHTML = '<i class="bi bi-check-circle me-1"></i>Đã ghi nhận';
        button.className = 'btn btn-sm btn-info';
        
        // Show improvement message
        showFeedbackMessage('Cảm ơn phản hồi! Chúng tôi sẽ cố gắng cải thiện để mang lại trải nghiệm tốt hơn.', 'info');
    }
    
    // Reset button after 3 seconds
    setTimeout(() => {
        button.disabled = false;
        button.innerHTML = originalText;
        button.className = type === 'positive' ? 'btn btn-sm btn-success me-1' : 'btn btn-sm btn-secondary';
    }, 3000);
    
    // Log rating (in real application, this would be sent to server)
    console.log(`User rating: ${type} at ${new Date().toISOString()}`);
}

function showFeedbackMessage(message, type) {
    // Create toast notification
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="bi bi-check-circle me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast, {
        delay: 4000
    });
    
    bsToast.show();
    
    // Remove toast element after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Enhanced email functionality
function openFeedbackEmail(type) {
    const subject = encodeURIComponent(`${type} - Triết học Mác-Lê-nin`);
    const body = encodeURIComponent(`
Xin chào nhóm phát triển,

Tôi muốn ${type.toLowerCase()} về website Triết học Mác-Lê-nin:

[Vui lòng mô tả chi tiết ở đây]

Thông tin bổ sung:
- Thời gian truy cập: ${new Date().toLocaleString('vi-VN')}
- Trình duyệt: ${navigator.userAgent}
- URL trang: ${window.location.href}

Cảm ơn!
    `);
    
    const email = type === 'Góp ý nội dung' ? 
        'feedback@mln-history.edu.vn' : 
        'error-report@mln-history.edu.vn';
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

// Add click handlers for email links
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    
    // Add feedback email handlers
    document.querySelectorAll('a[href^="mailto:feedback"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openFeedbackEmail('Góp ý nội dung');
        });
    });
    
    document.querySelectorAll('a[href^="mailto:error-report"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openFeedbackEmail('Báo lỗi');
        });
    });
});

// Track user engagement for feedback purposes
function trackUserEngagement() {
    const engagementData = {
        timeSpent: Date.now() - (window.loadTime || Date.now()),
        sectionsVisited: [],
        quizCompleted: false,
        modalOpened: false
    };
    
    // Track sections visited
    const sections = ['philosophy-overview', 'timeline', 'philosophy-intro', 'key-thinkers', 'applications', 'resources', 'quiz'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !engagementData.sectionsVisited.includes(sectionId)) {
                        engagementData.sectionsVisited.push(sectionId);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(section);
        }
    });
    
    // Store engagement data for feedback context
    window.userEngagement = engagementData;
}

// Initialize engagement tracking
window.loadTime = Date.now();
trackUserEngagement();