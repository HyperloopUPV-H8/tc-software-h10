#include <stdio.h>

int main() {
    int majority_age = 18;               // Simple assigned value
    int min_majority_year = 2024 - 18;   // Dynamically assigned value
    int birth_year;

    printf("Enter your birth year: ");
    scanf("%d", &birth_year);

    // Conditional
    if (birth_year <= min_majority_year) {
        printf("You are an adult!\n");
    } else {
        int years_to_majority = birth_year - min_majority_year ;
        printf("You are not an adult! You have %d years left until majority!\n", years_to_majority);
    }

    return 0;
}
