const AmlIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"shrink-0 " + className}
    >
      <g clipPath="url(#clip0_227_1542)">
        <path
          d="M14.6021 12.6953C14.5073 12.4946 14.3737 12.3173 14.2044 12.1686C14.0596 12.0411 13.9012 11.946 13.7341 11.886C13.5236 11.8102 13.3258 11.7812 13.1292 11.797C13.0007 11.8072 12.8329 11.8283 12.6713 11.9008C12.518 11.9694 12.3659 12.0453 12.2192 12.1184C12.1762 12.1399 12.1327 12.1615 12.0897 12.183C11.9244 12.2648 11.7496 12.3524 11.5227 12.4667C11.4194 12.5187 11.3162 12.5712 11.2133 12.6236C11.0455 12.7089 10.8776 12.7941 10.7094 12.8783C10.5241 12.9707 10.4296 13.2046 10.4945 13.411C10.5332 13.5336 10.6204 13.6332 10.7342 13.6834C10.8488 13.7339 10.9798 13.7305 11.0936 13.6739C11.2476 13.5974 11.4016 13.5204 11.5552 13.4434L11.7007 13.3706C11.8635 13.2891 12.0258 13.2076 12.1882 13.1258C12.2758 13.0816 12.363 13.0375 12.4502 12.993C12.6074 12.913 12.7702 12.8304 12.9307 12.7508C13.0642 12.6847 13.1989 12.667 13.3423 12.696C13.486 12.7251 13.6075 12.7964 13.7148 12.9137C13.8363 13.0469 13.9012 13.2103 13.9133 13.4132C13.9184 13.4993 13.9071 13.5872 13.8782 13.6826C13.8264 13.855 13.7407 13.981 13.6166 14.0682C13.5287 14.1297 13.4302 14.1833 13.335 14.2353C13.1321 14.3455 12.9289 14.4545 12.7253 14.5632C12.6348 14.6115 12.5443 14.6601 12.4538 14.7084L11.6117 15.1612C11.4526 15.2468 11.2881 15.3355 11.1257 15.4211C10.9601 15.5083 10.8057 15.5864 10.6529 15.6599C10.4277 15.7686 10.1807 15.8595 9.8976 15.9372C9.61264 16.0157 9.37585 16.061 9.15219 16.0798C9.10695 16.0836 9.06207 16.0881 9.01719 16.0927C8.92707 16.1017 8.84206 16.1104 8.75668 16.1134C8.64503 16.1172 8.5228 16.1145 8.37284 16.1051C8.23566 16.0964 8.08533 16.0828 7.91348 16.0628C7.67961 16.0361 7.42895 15.9795 7.12465 15.8848C6.78168 15.7784 6.46498 15.6271 6.20009 15.4935C6.05269 15.4192 5.90492 15.346 5.75715 15.2728L4.46554 14.6315C4.32288 14.5609 4.18058 14.49 4.03792 14.4191C3.92044 14.3606 3.80295 14.3017 3.68547 14.2429C3.48333 14.1418 3.2812 14.0407 3.07834 13.9399C3.07907 12.7043 3.07907 11.4684 3.07907 10.2328V9.80801H3.4961C3.98064 9.80763 4.4816 9.80726 4.97379 9.80914C5.06391 9.80914 5.16425 9.81744 5.29013 9.83404C5.51634 9.86423 5.73818 9.93478 5.96731 10.0495C6.14901 10.1404 6.30262 10.243 6.43725 10.3634C6.58575 10.4962 6.73425 10.629 6.88202 10.7629C6.94076 10.8161 6.99878 10.8697 7.05715 10.9236C7.10203 10.9651 7.14691 11.0062 7.19179 11.0474C7.26804 11.1168 7.3443 11.1862 7.42056 11.2556C7.48185 11.3111 7.54278 11.3665 7.60408 11.4224C7.63984 11.4548 7.67559 11.4876 7.71135 11.5205C7.75149 11.5574 7.79162 11.5944 7.83212 11.631C7.90108 11.6936 7.96967 11.7559 8.03863 11.8181C8.10394 11.8774 8.16925 11.9362 8.2342 11.9955C8.28272 12.0396 8.33125 12.0837 8.37941 12.1283C8.43013 12.1747 8.48048 12.2211 8.53156 12.2671C8.63226 12.3588 8.73333 12.4501 8.8344 12.5414L8.99895 12.6904C9.05733 12.7436 9.11607 12.7968 9.17518 12.8492C9.29631 12.956 9.35688 13.0824 9.36089 13.2359C9.36527 13.4129 9.29813 13.5547 9.15584 13.6698C9.00187 13.7939 8.76507 13.8045 8.6049 13.6943C8.27543 13.468 7.94669 13.2412 7.61758 13.0148L6.79774 12.4504C6.52154 12.2603 6.2457 12.0705 5.96987 11.88C5.85639 11.8015 5.72942 11.7778 5.60245 11.8117C5.43388 11.8566 5.32151 11.983 5.29414 12.1577C5.26422 12.349 5.33282 12.5123 5.48752 12.6172C5.63456 12.7176 5.78123 12.8187 5.92791 12.9198L6.0775 13.0231C6.26394 13.1518 6.45039 13.2801 6.63683 13.4087C7.10459 13.7309 7.58839 14.064 8.06235 14.3938C8.38416 14.6175 8.7264 14.7005 9.07958 14.6405C9.4605 14.576 9.76479 14.3749 9.98407 14.0425C10.1089 13.8535 10.184 13.643 10.207 13.417C10.2347 13.1469 10.1964 12.8919 10.0928 12.6595C10.01 12.4738 9.89176 12.3131 9.74071 12.1822C9.67504 12.1249 9.609 12.0634 9.54515 12.0038C9.50647 11.9675 9.46816 11.9317 9.42912 11.8962C9.37147 11.8434 9.31346 11.7913 9.25508 11.7389C9.20291 11.6921 9.15109 11.6453 9.09928 11.5982C9.06134 11.5635 9.02339 11.5288 8.98581 11.4937C8.94568 11.4563 8.90554 11.4194 8.86504 11.3824C8.81177 11.3341 8.75814 11.2858 8.7045 11.2379C8.65123 11.19 8.59833 11.1424 8.54542 11.0945C8.5042 11.0572 8.4637 11.0194 8.42283 10.9817C8.38233 10.944 8.34147 10.9066 8.3006 10.8693C8.23493 10.8097 8.16889 10.7501 8.10285 10.6905C8.039 10.6331 7.97551 10.5754 7.91202 10.5177C7.87225 10.4814 7.83285 10.4452 7.79344 10.4086C7.75258 10.3709 7.71172 10.3332 7.67049 10.2958C7.55957 10.1951 7.44829 10.0947 7.337 9.99439L7.28154 9.94421C7.24798 9.91403 7.21477 9.88347 7.18157 9.85253C7.10495 9.7816 7.02541 9.70841 6.94149 9.63975C6.62662 9.38282 6.2738 9.19041 5.89325 9.06818C5.59333 8.97197 5.29013 8.92179 4.99167 8.91953C4.51735 8.91576 4.03573 8.91651 3.56981 8.91727C3.40598 8.91727 3.2418 8.91764 3.07797 8.91764V8.86747C3.07797 8.73957 3.07797 8.6113 3.07797 8.4834C3.07797 8.25628 2.88569 8.0567 2.66714 8.0567C1.91552 8.0567 1.16391 8.0567 0.411929 8.0567C0.192647 8.05632 0 8.25515 0 8.48189C0 10.6969 0 12.9119 0 15.1268C0 15.3634 0.186444 15.5554 0.415577 15.5558C1.16573 15.5558 1.91589 15.5558 2.66604 15.5558C2.89299 15.5558 3.07797 15.3645 3.07834 15.1291C3.07834 15.0616 3.07834 14.9937 3.07834 14.9254L3.68182 15.2257C3.92737 15.3479 4.17256 15.4698 4.41811 15.592C4.51954 15.6422 4.62097 15.6927 4.7224 15.7429C4.8377 15.7999 4.953 15.8572 5.06829 15.9146C5.15732 15.9587 5.24635 16.0032 5.33537 16.0478C5.47402 16.1168 5.6123 16.1862 5.75131 16.2549C5.79437 16.276 5.83706 16.2975 5.88011 16.319C6.01803 16.3881 6.16032 16.459 6.30517 16.5224C6.65435 16.6752 6.98674 16.7842 7.32204 16.8555C7.50228 16.8936 7.69128 16.9264 7.88393 16.9528C8.08023 16.9796 8.23967 16.9936 8.38525 16.997C8.47683 16.9992 8.56768 17.0008 8.65817 17.0008C8.85519 17.0008 9.05112 16.9925 9.24888 16.963C9.29631 16.9559 9.34411 16.9498 9.3919 16.9434C9.47582 16.9325 9.56266 16.9211 9.64913 16.9049C9.96838 16.8449 10.2803 16.7585 10.5762 16.6488C10.8667 16.5409 11.148 16.4122 11.4129 16.2666C11.6099 16.1579 11.8124 16.05 12.008 15.9459C12.1057 15.8938 12.2035 15.8418 12.3013 15.7893C12.4002 15.7361 12.4987 15.6829 12.5972 15.6297C12.7089 15.5694 12.8205 15.5094 12.9322 15.4494L13.1153 15.3509C13.359 15.22 13.6108 15.085 13.8593 14.9537C14.0731 14.8405 14.2409 14.7099 14.3719 14.5545C14.4872 14.4179 14.5799 14.2629 14.6477 14.0935C14.7514 13.8339 14.7893 13.5532 14.7597 13.2593C14.7404 13.0658 14.6875 12.876 14.6025 12.6957L14.6021 12.6953ZM2.22529 14.6749C1.9542 14.6741 1.68347 14.6737 1.41238 14.6737C1.30511 14.6737 1.19748 14.6737 1.09021 14.6737H0.855965V8.94292H2.2242V9.58089C2.2242 11.2786 2.2242 12.9767 2.22529 14.6745V14.6749Z"
          fill="currentColor"
        />
        <path
          d="M4.01968 8.23402C4.10177 8.31891 4.21597 8.36758 4.33346 8.36758C6.10632 8.3672 7.87919 8.3672 9.65205 8.3672H10.9546H10.9703C10.9856 8.3672 11.0009 8.3672 11.0159 8.3672C11.1644 8.36079 11.2972 8.27929 11.3716 8.14876C11.4453 8.01935 11.4508 7.86203 11.3859 7.72772C11.3085 7.56813 11.1768 7.48362 11.0042 7.48362C9.27551 7.48438 7.54716 7.48438 5.81845 7.48438H4.75159V0.885464H16.1386V1.34536C16.1386 2.66658 16.1386 3.98779 16.1389 5.30863C16.1389 5.35164 16.1407 5.4022 16.1528 5.45313C16.186 5.59348 16.2725 5.70062 16.3965 5.75457C16.5239 5.81003 16.6705 5.80022 16.7891 5.72779C16.9285 5.6429 16.9993 5.50217 16.9993 5.31014C17 3.69956 17 2.08897 16.9993 0.478384C16.9993 0.42632 16.9934 0.375766 16.9821 0.328606C16.934 0.129028 16.7701 0 16.5654 0H4.36666H4.34769C4.33346 0 4.31923 0 4.305 0C4.08316 0.00264092 3.89599 0.198069 3.89599 0.427452V1.88185C3.89599 3.85839 3.89636 5.90209 3.89453 7.91221C3.89453 8.03595 3.93904 8.15027 4.02004 8.23402H4.01968Z"
          fill="currentColor"
        />
        <path
          d="M15.1759 4.72385C15.2014 4.87137 15.335 4.97625 15.4875 4.95965C15.624 4.94456 15.7374 4.831 15.7378 4.67254C15.7389 3.93195 15.7385 3.19174 15.7382 2.45115C15.7382 2.31759 15.6488 2.19988 15.5229 2.17272C15.466 2.16065 15.4058 2.16555 15.3492 2.15272C15.1051 2.09689 14.9143 1.88976 14.9048 1.61058C14.9034 1.5638 14.895 1.51437 14.8771 1.47174C14.8205 1.33668 14.7071 1.29631 14.5761 1.29631C11.8433 1.29593 9.11044 1.29631 6.37763 1.29631C6.324 1.29631 6.26927 1.29669 6.21673 1.3065C6.1474 1.31932 6.08939 1.35441 6.04378 1.4144C5.98759 1.48797 5.99161 1.57474 5.98175 1.65925C5.95074 1.91919 5.75955 2.12066 5.50743 2.1565C5.46475 2.16253 5.42023 2.15801 5.37937 2.16857C5.2254 2.20781 5.15096 2.31005 5.1506 2.48171C5.14878 3.59316 5.14951 4.70461 5.14987 5.81606C5.14987 5.86511 5.15315 5.91453 5.15863 5.9632C5.1703 6.06808 5.26772 6.17447 5.36806 6.19145C5.41622 6.19975 5.46511 6.20277 5.51364 6.20956C5.78874 6.24729 5.99234 6.50232 5.98942 6.78641C5.98796 6.93242 6.11639 7.06182 6.25905 7.06182C7.90458 7.06182 9.5501 7.06182 11.1956 7.06182C11.3843 7.06182 11.5079 6.89997 11.4664 6.69662C11.4401 6.56684 11.323 6.47893 11.1927 6.47893C9.65555 6.47893 8.11802 6.47893 6.58086 6.48006C6.53561 6.48006 6.51555 6.4695 6.49986 6.42159C6.37763 6.04771 6.13427 5.79569 5.77196 5.67043C5.72927 5.65572 5.71942 5.63799 5.71942 5.59498C5.72051 4.65292 5.72051 3.71125 5.71942 2.76919C5.71942 2.72731 5.73073 2.70807 5.77013 2.69449C6.13646 2.56848 6.38128 2.31495 6.50205 1.93579C6.51445 1.89655 6.53343 1.88599 6.57137 1.88599C9.15423 1.88675 11.7371 1.88675 14.3196 1.88675H14.3685C14.4579 2.15499 14.5334 2.28854 14.7264 2.4685C14.841 2.57527 14.9745 2.64997 15.1219 2.69525C15.1646 2.70845 15.1748 2.72731 15.1748 2.77108C15.1734 3.40603 15.1737 4.04098 15.1737 4.67556C15.1737 4.69141 15.1726 4.70801 15.1752 4.72347L15.1759 4.72385Z"
          fill="currentColor"
        />
        <path
          d="M16.1116 5.93038C15.6165 5.45614 15.0232 5.21582 14.3486 5.21582H14.3413C13.6017 5.21771 12.9668 5.49764 12.4542 6.04809C11.9948 6.54156 11.7351 7.1652 11.7227 7.8043V7.80694C11.7248 8.57734 11.9923 9.2885 12.4757 9.81027C12.9453 10.317 13.5762 10.6075 14.2526 10.6286C14.2836 10.6297 14.3146 10.6301 14.3456 10.6301C15.0932 10.6301 15.7339 10.3422 16.251 9.77368C16.7574 9.21644 16.9938 8.54301 16.9533 7.77223C16.9154 7.049 16.6319 6.42951 16.1112 5.93076L16.1116 5.93038ZM16.1751 7.92126C16.1751 8.43133 15.9824 8.90972 15.6329 9.26926C15.2855 9.62616 14.8265 9.82159 14.3362 9.81895C13.3339 9.81367 12.5312 9.00102 12.5086 7.96955C12.4856 6.92676 13.2828 6.05563 14.2851 6.02772C14.3022 6.02734 14.319 6.02696 14.3362 6.02696C14.82 6.02696 15.2746 6.21749 15.6205 6.56722C15.9744 6.92488 16.1765 7.41835 16.1751 7.92126Z"
          fill="currentColor"
        />
        <path
          d="M10.7863 5.62932C10.9458 5.62932 11.1048 5.63008 11.2643 5.62932C11.4369 5.62819 11.5631 5.50218 11.5635 5.32901C11.5642 4.94683 11.5657 4.56465 11.5631 4.18247C11.562 4.00779 11.4252 3.89046 11.2818 3.89197C10.8396 3.89612 10.397 3.89348 9.95479 3.89348H9.89677V3.3204H9.95588C10.4043 3.3204 10.8531 3.32153 11.3015 3.31965C11.4613 3.31889 11.5835 3.16006 11.5598 2.9884C11.5376 2.8273 11.4047 2.73487 11.2606 2.73676C11.0997 2.73902 10.9388 2.73713 10.7783 2.73713H10.7257C10.7257 2.63489 10.7272 2.53944 10.7257 2.44361C10.7236 2.32289 10.6641 2.23649 10.5608 2.18971C10.4546 2.14142 10.3499 2.15387 10.2587 2.23498C10.1901 2.2961 10.1617 2.37533 10.162 2.46738C10.1624 2.55642 10.162 2.64508 10.162 2.73713C10.1387 2.73713 10.1219 2.73713 10.1051 2.73713C9.93946 2.73713 9.77418 2.73713 9.60853 2.73713C9.45529 2.73751 9.33197 2.86427 9.33197 3.02084C9.33197 3.40793 9.33598 3.79501 9.33014 4.18172C9.32795 4.33338 9.45785 4.47562 9.61401 4.47448C10.0548 4.47109 10.4955 4.47335 10.9363 4.47335H10.9921V5.03851C10.9713 5.03851 10.953 5.03851 10.9352 5.03851C10.4959 5.03851 10.0566 5.03587 9.61765 5.03964C9.41297 5.04153 9.28344 5.21885 9.34583 5.43163C9.38232 5.55575 9.49251 5.62819 9.63663 5.62857C9.80957 5.62894 9.98288 5.62857 10.1628 5.62857C10.1628 5.72477 10.1628 5.81381 10.1628 5.90322C10.1628 6.07111 10.2868 6.20014 10.4477 6.20089C10.6145 6.20165 10.7349 6.05187 10.7272 5.90473C10.7225 5.81419 10.7265 5.72364 10.7265 5.62857C10.7509 5.62857 10.7692 5.62857 10.7874 5.62857L10.7863 5.62932Z"
          fill="currentColor"
        />
        <path
          d="M14.9906 8.1778C14.9085 8.09367 14.8257 8.01029 14.7421 7.9254C14.7538 7.91182 14.7607 7.90314 14.768 7.8956C14.968 7.68847 15.1676 7.48135 15.3682 7.27498C15.4438 7.19726 15.4719 7.10521 15.4514 6.99768C15.4299 6.88639 15.3646 6.81282 15.2602 6.78151C15.1559 6.74981 15.0599 6.77056 14.9807 6.85092C14.8826 6.95052 14.7859 7.05201 14.6889 7.15274C14.5758 7.27045 14.463 7.38892 14.3422 7.51493C14.3178 7.48663 14.3003 7.464 14.2806 7.44362C14.0905 7.24669 13.9004 7.04975 13.7099 6.85357C13.5972 6.73736 13.4104 6.74076 13.3009 6.8596C13.1955 6.97392 13.1988 7.15652 13.31 7.27272C13.4469 7.41608 13.5852 7.55794 13.7234 7.70017C13.7953 7.77412 13.8683 7.84731 13.942 7.92238C13.9267 7.93936 13.9168 7.95106 13.9059 7.96238C13.7147 8.16007 13.5231 8.35776 13.3319 8.55583C13.3111 8.57733 13.2871 8.59695 13.2721 8.62223C13.1918 8.75805 13.2148 8.90934 13.3148 9.00139C13.4367 9.11344 13.5987 9.10401 13.7099 8.9897C13.8719 8.82294 14.0336 8.65543 14.1952 8.48754C14.243 8.43812 14.2897 8.38719 14.3422 8.33135C14.359 8.3521 14.37 8.36795 14.3831 8.38153C14.5776 8.58299 14.771 8.78559 14.968 8.98441C15.003 9.01988 15.0497 9.04968 15.0964 9.06553C15.2208 9.10778 15.3577 9.05006 15.4197 8.93839C15.4857 8.81917 15.4675 8.66977 15.3755 8.57432C15.2475 8.44227 15.1198 8.30947 14.9917 8.1778H14.9906Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_227_1542">
          <rect width="17" height="17" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AmlIcon;
