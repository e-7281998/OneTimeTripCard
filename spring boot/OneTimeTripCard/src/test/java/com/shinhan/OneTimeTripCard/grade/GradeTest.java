package com.shinhan.OneTimeTripCard.grade;

import com.shinhan.OneTimeTripCard.service.GradeService;
import com.shinhan.OneTimeTripCard.vo.Grade;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class GradeTest {

    @Autowired
    GradeService gradeService;

    @Test
    void getNextGrades() {
        String [] grades = { "일반", "basic", "silver", "gold" };
        String [] nextGrades = { "basic", "silver", "gold", "diamond" };
        for (int i = 0; i < grades.length; ++i) {
            Assertions.assertThat(gradeService.getNextGrade(grades[i]).getGradeName()).isEqualTo(nextGrades[i]);
        }

        String diamond = "diamond";
        Assertions.assertThat(gradeService.getNextGrade(diamond)).isNull();
    }
}
