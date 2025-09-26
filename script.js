// JavaScript for Ho Chi Minh Thought Historical Timeline Website with Bootstrap

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
        title: "Thưa niên và hình thành (1890-1911)",
        content: `
            <p>Nguyễn Sinh Cung (sau này là Hồ Chí Minh) sinh ngày 19/5/1890 tại làng Sen, xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An trong một gia đình có truyền thống yêu nước.</p>
            
            <h4>1. Môi trường gia đình và quê hương</h4>
            <p>Cha là Nguyễn Sinh Sắc (Nguyễn Sinh Huy), một nhà nho yêu nước, từng làm quan nhưng bỏ quan vì không chịu nổi cảnh nô lệ. Mẹ là bà Hoàng Thị Loan, người phụ nữ hiền lành, đảm đang. Quê hương Nghệ An là vùng đất có truyền thống đấu tranh yêu nước lâu đời.</p>
            
            <h4>2. Thời thơ ấu và niên thiếu</h4>
            <p>Từ nhỏ, Nguyễn Sinh Cung đã thể hiện tính cách thông minh, ham học hỏi và tinh thần yêu nước. Năm 1895, gia đình chuyển về Huế, nơi ông học tại trường Quốc học Huế từ 1907-1909.</p>
            
            <h5>Những ảnh hưởng sớm:</h5>
            <ul>
                <li>Chứng kiến cảnh đau khổ của dân tộc dưới ách đô hộ Pháp</li>
                <li>Tiếp xúc với phong trào Duy Tân và tư tưởng cải cách</li>
                <li>Được cha truyền dạy lòng yêu nước và tinh thần bất khuất</li>
                <li>Học hỏi từ những nhà yêu nước như Phan Bội Châu, Phan Chu Trinh</li>
            </ul>
            
            <h4>3. Hình thành ý thức yêu nước</h4>
            <p>Giai đoạn này, tâm hồn trẻ thơ của Hồ Chí Minh đã được hun đúc bởi:</p>
            <ul>
                <li>Tình yêu sâu sắc dành cho đất nước và dân tộc</li>
                <li>Lòng căm thù kẻ thù xâm lược</li>
                <li>Khát vọng tìm ra con đường cứu nước</li>
                <li>Tinh thần học hỏi không ngừng</li>
            </ul>
            
            <h4>Ý nghĩa lịch sử:</h4>
            <p>Giai đoạn thưa niên này đã hình thành nên nền tảng tư tưởng yêu nước sâu sắc, tình yêu dân tộc mãnh liệt và khát vong giải phóng tổ quốc - những giá trị cốt lõi sẽ xuyên suốt cuộc đời hoạt động cách mạng của Người.</p>
        `
    },
    2: {
        title: "Ra đi tìm đường cứu nước (1911-1920)",
        content: `
            <p>Năm 1911, với ước mơ tìm đường cứu nước, Nguyễn Tất Thành lên tàu Amiral Latouche-Tréville rời cảng Nhà Rồng (Sài Gòn) ra đi tìm hiểu thế giới.</p>
            
            <h4>1. Cuộc hành trình khắp năm châu</h4>
            <p>Trong gần 10 năm (1911-1920), Hồ Chí Minh đã đi qua nhiều quốc gia, làm nhiều nghề khác nhau để tìm hiểu thế giới và con đường cứu nước.</p>
            
            <h5>Những điểm đến chính:</h5>
            <ul>
                <li><strong>Pháp (1917-1923):</strong> Làm thợ rửa ảnh, phụ bếp, công nhân. Tham gia hoạt động chính trị, viết báo</li>
                <li><strong>Anh:</strong> Làm việc trên tàu biển, tiếp xúc với phong trào công nhân</li>
                <li><strong>Mỹ:</strong> Quan sát xã hội tư bản chủ nghĩa phát triển</li>
                <li><strong>Châu Phi:</strong> Chứng kiến thực dân phương Tây bóc lột các dân tộc</li>
            </ul>
            
            <h4>2. Những trải nghiệm quan trọng</h4>
            <p>Qua cuộc sống lao động vất vả, Hồ Chí Minh đã:</p>
            <ul>
                <li>Hiểu sâu sắc về đời sống của tầng lớp lao động</li>
                <li>Chứng kiến sự bất công trong xã hội tư bản chủ nghĩa</li>
                <li>Nhận thức được tình đoàn kết của các dân tộc bị áp bức</li>
                <li>Học được nhiều ngoại ngữ và kinh nghiệm sống</li>
            </ul>
            
            <h4>3. Bước đầu hoạt động chính trị</h4>
            <p>Tại Pháp (1917-1923), với tên Nguyễn Ái Quốc, Người đã:</p>
            <ul>
                <li>Tham gia Hội người Việt yêu nước tại Pháp</li>
                <li>Viết nhiều bài báo phê phán chế độ thực dân</li>
                <li>Gửi "Bản yêu sách 8 điều" tới Hội nghị Versailles (1919)</li>
                <li>Sáng lập báo "Le Paria" (Kẻ cùng đinh) năm 1922</li>
            </ul>
            
            <h4>4. Tiếp cận với các tư tưởng giải phóng</h4>
            <p>Trong thời gian này, Hồ Chí Minh đã tìm hiểu nhiều tư tưởng khác nhau:</p>
            <ul>
                <li>Dân chủ tư sản phương Tây</li>
                <li>Các phong trào giải phóng dân tộc</li>
                <li>Tư tưởng xã hội chủ nghĩa không tưởng</li>
                <li>Phong trào công nhân quốc tế</li>
            </ul>
            
            <h4>Ý nghĩa lịch sử:</h4>
            <p>Giai đoạn "ra đi tìm đường cứu nước" đã giúp Hồ Chí Minh mở rộng tầm nhìn, tích lũy kinh nghiệm và chuẩn bị cho việc lựa chọn con đường cách mạng phù hợp với Việt Nam. Đây là tiền đề quan trọng để Người tiếp cận với chủ nghĩa Mác-Lê-nin.</p>
        `
    },
    3: {
        title: "Tiếp cận tư tưởng tiến bộ (1920-1930)",
        content: `
            <p>Năm 1920, khi đọc "Luận cương của Lenin về vấn đề dân tộc và thuộc địa", Nguyễn Ái Quốc đã tìm thấy con đường cứu nước chân chính.</p>
            
            <h4>1. Sự lựa chọn lịch sử (1920)</h4>
            <p>Tại Đại hội Tours của Đảng Xã hội Pháp (tháng 12/1920), Nguyễn Ái Quốc đã bỏ phiếu tán thành gia nhập Quốc tế Cộng sản lần thứ III, trở thành một trong những người sáng lập Đảng Cộng sản Pháp.</p>
            
            <h5>Lý do lựa chọn tư tưởng tiến bộ:</h5>
            <ul>
                <li><strong>Tính khoa học:</strong> Mác-Lê-nin chỉ ra quy luật phát triển khách quan của xã hội</li>
                <li><strong>Tính cách mạng:</strong> Đề ra con đường đấu tranh cách mạng quyết liệt</li>
                <li><strong>Tính quốc tế:</strong> Liên kết đấu tranh giải phóng các dân tộc</li>
                <li><strong>Quan tâm đến vấn đề thuộc địa:</strong> Lenin đặc biệt chú ý đến các dân tộc bị áp bức</li>
            </ul>
            
            <h4>2. Hoạt động tuyên truyền và tổ chức (1920-1924)</h4>
            <p>Từ 1920-1924, tại Pháp, Hồ Chí Minh đã:</p>
            <ul>
                <li>Nghiên cứu sâu các tác phẩm của Marx, Engels, Lenin</li>
                <li>Viết nhiều bài báo tuyên truyền tư tưởng tiến bộ</li>
                <li>Thành lập Hội Liên hiệp thuộc địa (1921)</li>
                <li>Xuất bản báo "Le Paria" rồi "Le Proscrit"</li>
                <li>Tham gia các hoạt động của Đảng Cộng sản Pháp</li>
            </ul>
            
            <h4>3. Học tập và tu nghiệp tại Liên Xô (1924-1925)</h4>
            <p>Tại Liên Xô, Hồ Chí Minh đã:</p>
            <ul>
                <li>Học tại Trường Đại học Phương Đông</li>
                <li>Nghiên cứu lý thuyết tiến bộ một cách có hệ thống</li>
                <li>Viết tác phẩm "Bản án chế độ thực dân Pháp"</li>
                <li>Tham gia Đại hội V Quốc tế Cộng sản</li>
                <li>Chuẩn bị kế hoạch hoạt động cách mạng tại Đông Nam Á</li>
            </ul>
            
            <h4>4. Hoạt động tại Trung Quốc (1925-1930)</h4>
            <p>Giai đoạn quan trọng trong việc chuẩn bị thành lập Đảng:</p>
            <ul>
                <li>Thành lập Hội Việt Nam Cách mạng Thanh niên (1925)</li>
                <li>Mở lớp huấn luyện cán bộ cách mạng</li>
                <li>Viết "Đường Kách Mệnh" - cẩm nang cách mạng</li>
                <li>Chuẩn bị điều kiện thành lập Đảng Cộng sản Việt Nam</li>
            </ul>
            
            <h4>5. Quá trình vận dụng sáng tạo</h4>
            <p>Hồ Chí Minh không máy móc áp dụng mà sáng tạo vận dụng:</p>
            <ul>
                <li><strong>Kết hợp giải phóng dân tộc với giải phóng giai cấp</strong></li>
                <li><strong>Xây dựng khối đại đoàn kết dân tộc</strong></li>
                <li><strong>Vận dụng theo điều kiện Việt Nam</strong></li>
                <li><strong>Giữ gìn bản sắc dân tộc</strong></li>
            </ul>
            
            <h4>Ý nghĩa lịch sử:</h4>
            <p>Giai đoạn này đánh dấu sự trưởng thành về tư tưởng chính trị của Hồ Chí Minh. Từ một người yêu nước đơn thuần, Người đã trở thành một nhà cách mạng chuyên nghiệp, nắm vững lý thuyết Mác-Lê-nin và biết vận dụng sáng tạo vào điều kiện cụ thể của Việt Nam.</p>
        `
    },
    4: {
        title: "Lãnh đạo cách mạng và kháng chiến (1930-1954)",
        content: `
            <p>Từ 1930 đến 1954, Hồ Chí Minh đã lãnh đạo dân tộc Việt Nam qua những giai đoạn lịch sử hết sức khốc liệt và vinh quang.</p>
            
            <h4>1. Thành lập Đảng Cộng sản Việt Nam (1930)</h4>
            <p>Ngày 3/2/1930, tại Hồng Kông, Hồ Chí Minh đã:</p>
            <ul>
                <li>Thống nhất 3 tổ chức cộng sản thành Đảng Cộng sản Việt Nam</li>
                <li>Soạn thảo Cương lĩnh chính trị đầu tiên của Đảng</li>
                <li>Xác định nhiệm vụ cách mạng dân tộc dân chủ nhân dân</li>
                <li>Đề ra đường lối kết hợp giải phóng dân tộc với giải phóng giai cấp</li>
            </ul>
            
            <h4>2. Thời kỳ hoạt động bí mật (1930-1941)</h4>
            <p>Giai đoạn khó khăn nhưng quan trọng trong việc xây dựng lực lượng:</p>
            
            <h5>Những thử thách:</h5>
            <ul>
                <li>Bị thực dân Pháp truy nã gắt gao</li>
                <li>Phải hoạt động bí mật, thường xuyên thay đổi địa điểm</li>
                <li>Đảng và cách mạng gặp nhiều khó khăn, thử thách</li>
                <li>Cần xây dựng và củng cố tổ chức cách mạng</li>
            </ul>
            
            <h5>Những đóng góp:</h5>
            <ul>
                <li>Chỉ đạo Đảng vượt qua khủng hoảng "Trái khuynh" (1930-1932)</li>
                <li>Xây dựng đường lối kháng Nhật cứu nước</li>
                <li>Chuẩn bị lực lượng cho cơ hội cách mạng</li>
            </ul>
            
            <h4>3. Cách mạng Tháng Tám và nền Độc lập (1945)</h4>
            <p>Thành công lịch sử vĩ đại nhất của dân tộc Việt Nam:</p>
            
            <h5>Chuẩn bị cách mạng:</h5>
            <ul>
                <li>Về nước (1941), thành lập Mặt trận Việt Minh</li>
                <li>Xây dựng căn cứ địa Việt Bắc</li>
                <li>Chuẩn bị lực lượng vũ trang</li>
                <li>Chỉ đạo khởi nghĩa Tháng Tám</li>
            </ul>
            
            <h5>Tuyên ngôn Độc lập (2/9/1945):</h5>
            <p>Tại Quảng trường Ba Đình, Hà Nội, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa với những nội dung:</p>
            <ul>
                <li>Khẳng định chân lý "Tất cả mọi người đều sinh ra có quyền bình đẳng"</li>
                <li>Tố cáo tội ác của thực dân Pháp</li>
                <li>Tuyên bố độc lập của dân tộc Việt Nam</li>
                <li>Kêu gọi đoàn kết quốc tế</li>
            </ul>
            
            <h4>4. Kháng chiến chống Pháp (1946-1954)</h4>
            <p>Cuộc chiến tranh nhân dân toàn diện đầu tiên:</p>
            
            <h5>Đường lối kháng chiến:</h5>
            <ul>
                <li>"Toàn dân, toàn diện, trường kỳ, tự lực cánh sinh"</li>
                <li>Kết hợp đấu tranh vũ trang với đấu tranh chính trị, ngoại giao</li>
                <li>Xây dựng hậu phương vững chắc</li>
                <li>Tranh thủ sự ủng hộ của nhân dân thế giới</li>
            </ul>
            
            <h5>Chiến thắng Điện Biên Phủ (1954):</h5>
            <p>"Lừng lẫy năm châu, chấn động địa cầu" - Chiến thắng Điện Biên Phủ đã:</p>
            <ul>
                <li>Bẻ gãy hoàn toàn ý chí xâm lược của thực dân Pháp</li>
                <li>Buộc Pháp ký Hiệp định Genève (1954)</li>
                <li>Khẳng định sức mạnh của chiến tranh nhân dân</li>
                <li>Cổ vũ phong trào giải phóng dân tộc trên thế giới</li>
            </ul>
            
            <h4>5. Tư tưởng lãnh đạo của Hồ Chí Minh</h4>
            <ul>
                <li><strong>Đoàn kết:</strong> "Đoàn kết, đoàn kết, đại đoàn kết"</li>
                <li><strong>Nhân dân:</strong> "Dân là gốc", "Nước có thể mất, dân không thể nô lệ"</li>
                <li><strong>Hy sinh:</strong> "Không có gì quý hơn độc lập tự do"</li>
                <li><strong>Kiên trung:</strong> "Thà hy sinh tất cả, chứ không chịu mất nước"</li>
            </ul>
            
            <h4>Ý nghĩa lịch sử:</h4>
            <p>24 năm lãnh đạo cách mạng và kháng chiến (1930-1954) đã chứng minh tài năng lãnh đạo xuất chúng của Hồ Chí Minh. Người đã biến tư tưởng Mác-Lê-nin thành hiện thực sống động tại Việt Nam, dẫn dắt dân tộc từ thành công này đến thành công khác.</p>
        `
    },
    5: {
        title: "Di sản tư tưởng (1954-nay)",
        content: `
            <p>Từ 1954 đến nay, tư tưởng Hồ Chí Minh đã trở thành kim chỉ nam soi sáng con đường phát triển của dân tộc Việt Nam.</p>
            
            <h4>1. Giai đoạn xây dựng chủ nghĩa xã hội ở miền Bắc (1954-1975)</h4>
            <p>Dưới sự chỉ đạo của Hồ Chí Minh, miền Bắc đã:</p>
            
            <h5>Cải cách ruộng đất và phát triển kinh tế:</h5>
            <ul>
                <li>Thực hiện cải cách ruộng đất, giải phóng nông dân</li>
                <li>Xây dựng nền kinh tế quốc dân độc lập, tự chủ</li>
                <li>Phát triển công nghiệp, nông nghiệp xã hội chủ nghĩa</li>
                <li>Xóa nạn đói, giảm nghèo đáng kể</li>
            </ul>
            
            <h5>Cách mạng văn hóa xã hội:</h5>
            <ul>
                <li>Xóa nạn mù chữ, phổ cập giáo dục</li>
                <li>Xây dựng nền văn hóa dân tộc, khoa học, đại chúng</li>
                <li>Giải phóng phụ nữ, bình đẳng giới</li>
                <li>Xây dựng con người mới xã hội chủ nghĩa</li>
            </ul>
            
            <h4>2. Kháng chiến chống Mỹ và thống nhất đất nước (1954-1975)</h4>
            <p>Tư tưởng Hồ Chí Minh về giải phóng miền Nam, thống nhất Tổ quốc:</p>
            
            <h5>Tư tưởng về thống nhất:</h5>
            <ul>
                <li>"Bắc Nam cùng một dòng máu" - tình đoàn kết dân tộc</li>
                <li>Kiên trì đấu tranh để thống nhất đất nước</li>
                <li>Kết hợp đấu tranh quân sự, chính trị, ngoại giao</li>
                <li>Tranh thủ sự ủng hộ của bạn bè quốc tế</li>
            </ul>
            
            <h5>Di chúc thiêng liêng (1969):</h5>
            <p>Trước khi từ trần, Hồ Chí Minh để lại Di chúc với những lời căn dặn:</p>
            <ul>
                <li>Về sự nghiệp cách mạng: Kiên trì đấu tranh đến thắng lợi cuối cùng</li>
                <li>Về xây dựng Đảng: "Đảng phải thật trong sạch, thật mạnh"</li>
                <li>Về xây dựng con người: "Cần, kiệm, liêm, chính, chí công vô tư"</li>
                <li>Về đoàn kết: "Đoàn kết là truyền thống quý báu của Đảng và của dân ta"</li>
            </ul>
            
            <h4>3. Thời kỳ Đổi mới (1986-nay)</h4>
            <p>Tư tưởng Hồ Chí Minh được vận dụng sáng tạo trong thời kỳ mới:</p>
            
            <h5>Đổi mới tư duy phát triển:</h5>
            <ul>
                <li>Kinh tế thị trường định hướng xã hội chủ nghĩa</li>
                <li>Hội nhập quốc tế nhưng giữ vững độc lập, chủ quyền</li>
                <li>Phát triển toàn diện, bền vững</li>
                <li>Lấy dân làm gốc, vì dân phục vụ</li>
            </ul>
            
            <h5>Xây dựng nhà nước pháp quyền:</h5>
            <ul>
                <li>Nhà nước của dân, do dân, vì dân</li>
                <li>Dân chủ xã hội chủ nghĩa</li>
                <li>Pháp chế xã hội chủ nghĩa</li>
                <li>Đảm bảo quyền con người</li>
            </ul>
            
            <h4>4. Những giá trị cốt lõi của tư tưởng Hồ Chí Minh</h4>
            
            <h5>Về lý tưởng, mục tiêu:</h5>
            <ul>
                <li><strong>Độc lập dân tộc:</strong> "Không có gì quý hơn độc lập tự do"</li>
                <li><strong>Chủ nghĩa xã hội:</strong> Xã hội không có người bóc lột người</li>
                <li><strong>Dân chủ:</strong> "Dân là gốc" - quyền làm chủ của nhân dân</li>
            </ul>
            
            <h5>Về phương pháp, con đường:</h5>
            <ul>
                <li><strong>Đoàn kết:</strong> Sức mạnh từ khối đại đoàn kết toàn dân tộc</li>
                <li><strong>Kết hợp:</strong> Cách mạng dân tộc và cách mạng xã hội</li>
                <li><strong>Quốc tế:</strong> Kết hợp sức mạnh dân tộc với sức mạnh thời đại</li>
            </ul>
            
            <h5>Về đạo đức, nhân cách:</h5>
            <ul>
                <li><strong>Cần kiệm liêm chính:</strong> Phẩm chất đạo đức người cộng sản</li>
                <li><strong>Vì nước vì dân:</strong> "Sống là để phụng sự Tổ quốc, phụng sự nhân dân"</li>
                <li><strong>Học tập suốt đời:</strong> "Học, học nữa, học mãi"</li>
            </ul>
            
            <h4>5. Tư tưởng Hồ Chí Minh trong thời đại mới</h4>
            
            <h5>Ứng dụng trong xây dựng đất nước:</h5>
            <ul>
                <li>Xây dựng nền kinh tế thị trường định hướng xã hội chủ nghĩa</li>
                <li>Phát triển văn hóa, giáo dục, khoa học công nghệ</li>
                <li>Bảo vệ môi trường, phát triển bền vững</li>
                <li>Xây dựng con người Việt Nam thời kỳ mới</li>
            </ul>
            
            <h5>Ứng dụng trong quan hệ quốc tế:</h5>
            <ul>
                <li>"Việt Nam muốn làm bạn với tất cả các nước trên thế giới"</li>
                <li>Hòa bình, hữu nghị, hợp tác và phát triển</li>
                <li>Đa dạng hóa, đa phương hóa quan hệ đối ngoại</li>
                <li>Tích cực hội nhập quốc tế</li>
            </ul>
            
            <h4>Ý nghĩa và giá trị thời đại:</h4>
            <p>Tư tưởng Hồ Chí Minh không chỉ là di sản quý báu của dân tộc Việt Nam mà còn đóng góp vào kho tàng tư tưởng tiến bộ của nhân loại. Trong bối cảnh hiện tại, tư tưởng Hồ Chí Minh vẫn là ngọn đèn soi sáng con đường phát triển của đất nước, hướng tới mục tiêu xây dựng Việt Nam trở thành nước phát triển, có thu nhập cao vào năm 2045.</p>
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
    q1: 'a', // "Dân là gốc" - nhân dân là nguồn gốc của quyền lực
    q2: 'a', // Cán bộ đảng viên và người công tác
    q3: 'b', // 2/9/1945 - Ngày đọc Tuyên ngôn Độc lập
    q4: 'a', // Quy luật chuyển hóa từ lượng sang chất
    q5: 'c', // Lực lượng sản xuất quyết định quan hệ sản xuất
    q6: 'b'  // Kinh tế thị trường định hướng xã hội chủ nghĩa
};

// Add more detailed quiz explanations
const quizExplanations = {
    q1: 'Tư tưởng "Dân là gốc" của Hồ Chí Minh thể hiện rõ ràng nhất tinh thần dân chủ, khẳng định nhân dân là nguồn gốc của mọi quyền lực, là chủ thể của lịch sử và cách mạng.',
    q2: 'Tiêu chuẩn đạo đức "Cần, kiệm, liêm, chính" do Hồ Chí Minh đề ra áp dụng cho đội ngũ cán bộ, đảng viên và người công tác để họ trở thành tấm gương sáng cho nhân dân noi theo.',
    q3: 'Tuyên ngôn Độc lập nước Việt Nam Dân chủ Cộng hòa do Chủ tịch Hồ Chí Minh đọc vào ngày 2 tháng 9 năm 1945 tại Quảng trường Ba Đình, Hà Nội, khai sinh ra nước Việt Nam độc lập.',
    q4: 'Quy luật chuyển hóa từ lượng sang chất thể hiện rằng sự tích lũy những thay đổi về lượng đến một giới hạn nhất định sẽ dẫn đến sự thay đổi căn bản về chất, tạo ra sự vật mới.',
    q5: 'Theo chủ nghĩa duy vật lịch sử, lực lượng sản xuất (bao gồm người lao động, tư liệu lao động và đối tượng lao động) quyết định tính chất của quan hệ sản xuất.',
    q6: 'Kinh tế thị trường định hướng xã hội chủ nghĩa là mô hình kinh tế độc đáo của Việt Nam, kết hợp cơ chế thị trường với định hướng và mục tiêu xã hội chủ nghĩa.'
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
        resultText += " - Xuất sắc! Bạn đã nắm vững kiến thức về Tư tưởng Hồ Chí Minh.";
        resultDiv.className = 'quiz-result correct alert alert-success';
        resultIcon = '<i class="bi bi-trophy-fill me-2"></i>';
    } else if (percentage >= 60) {
        resultText += " - Khá tốt! Bạn cần ôn lại một số kiến thức.";
        resultDiv.className = 'quiz-result correct alert alert-info';
        resultIcon = '<i class="bi bi-award-fill me-2"></i>';
    } else {
        resultText += " - Bạn cần học thêm về Tư tưởng Hồ Chí Minh.";
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
    const subject = encodeURIComponent(`${type} - Tư tưởng Hồ Chí Minh`);
    const body = encodeURIComponent(`
Xin chào nhóm phát triển,

Tôi muốn ${type.toLowerCase()} về website Tư tưởng Hồ Chí Minh:

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